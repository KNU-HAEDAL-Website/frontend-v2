import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  ToastAction,
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AddActivity } from '@/schema/admin'
import { activitiesQuery } from '@/service/data/activity'
import { AddActivityAction } from '@/service/server/activity/add-activity'

type AddActivityFormProps = {
  semesterId: number
}

export const AddActivityForm = ({ semesterId }: AddActivityFormProps) => {
  const {
    execute: addActivity,
    result,
    isExecuting,
  } = useAction(AddActivityAction)
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<AddActivity>({
    defaultValues: {
      activityName: '',
    },
  })

  const onSubmit = (value: AddActivity) => {
    addActivity({ semesterId, activityName: value.activityName })
  }

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 2000,
      })

      const { queryKey } = activitiesQuery(semesterId)
      queryClient.invalidateQueries({ queryKey })

      form.setValue('activityName', '')

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
  }, [result, toast, router, semesterId, form])

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex w-full items-end gap-4"
        >
          <FormField
            control={form.control}
            name="activityName"
            render={({ field }) => (
              <FormItem className="w-80">
                <FormLabel>활동 추가하기</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="부트캠프" />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isExecuting}>
            추가하기
          </Button>
        </form>
      </Form>
      {result.validationErrors && (
        <div className="pl-1 pt-1 text-sm text-destructive">
          {Object.values(result.validationErrors).flatMap((error) => error)[0]}
        </div>
      )}
    </div>
  )
}
