'use client'

import { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'

import { addSemester } from '@/servicetest/api/admin'
import { semesterQueries } from '@/servicetest/api/semester'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

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
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AddSemester, AddSemesterSchema } from '@/schema/admin'

type AddSemesterDialogFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const AddSemesterDialogForm = ({
  setOpen,
}: AddSemesterDialogFormProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: addSemester,
    onSuccess: (data) => onSuccess(data.message),
  })
  const { toast } = useToast()

  const form = useForm<AddSemester>({
    resolver: zodResolver(AddSemesterSchema),
    defaultValues: {
      year: '',
    },
  })

  const onSubmit = (values: AddSemester) => {
    mutate(values.year + values.term)
  }

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: semesterQueries.all() })

    setOpen(false)
  }

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
        <Button type="submit" disabled={isPending}>
          추가하기
        </Button>
      </form>
    </Form>
  )
}
