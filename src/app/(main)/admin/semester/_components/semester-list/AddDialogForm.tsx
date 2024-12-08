'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ToastAction,
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AddSemester, AddSemesterSchema } from '@/schema/admin'
import { semesterQuery } from '@/service/data/semester'
import { AddSemesterAction } from '@/service/server/semester/add-semester'

type AddSemesterDialogFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const AddSemesterDialogForm = ({
  setOpen,
}: AddSemesterDialogFormProps) => {
  const {
    execute: addSemester,
    result,
    isExecuting,
  } = useAction(AddSemesterAction)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<AddSemester>({
    resolver: zodResolver(AddSemesterSchema),
    defaultValues: {
      year: '',
    },
  })

  const onSubmit = (values: AddSemester) => {
    addSemester({ semesterName: values.year + values.term })
  }

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 1000,
      })

      const { queryKey } = semesterQuery()

      queryClient.invalidateQueries({ queryKey })

      setOpen(false)

      return
    }

    if (result.data?.action === 'login') {
      toast({
        title: result.data?.message,
        action: (
          <ToastAction
            onClick={() => router.push('/auth/login')}
            altText="로그인하기"
          >
            로그인하기
          </ToastAction>
        ),
      })

      return
    }

    if (result.data?.message) {
      toast({
        title: result.data.message,
      })
    }
  }, [result, toast, router, setOpen])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-8">
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>연도를 입력해주세요.</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="2024" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>학기를 선택해주세요.</FormLabel>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger className="data-[placeholder]:text-muted-foreground">
                    <SelectValue placeholder="학기" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1학기</SelectItem>
                    <SelectItem value="2">2학기</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isExecuting}>
          추가하기
        </Button>
      </form>
    </Form>
  )
}
