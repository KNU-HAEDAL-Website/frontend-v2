import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { AddActivity, AddActivitySchema } from '@/schema/admin'
import { activityQueries, addActivityApi } from '@/service/api'

type AddActivityFormProps = {
  semesterId: number
}

export const AddActivityForm = ({ semesterId }: AddActivityFormProps) => {
  const { mutate: addActivity, isPending } = useMutation({
    mutationFn: addActivityApi,
    onSuccess: (data) => onSuccess(data.message),
  })
  const { toast } = useToast()

  const form = useForm<AddActivity>({
    resolver: zodResolver(AddActivitySchema),
    defaultValues: {
      activityName: '',
    },
  })

  const [message, setMessage] = useState('')

  const onSubmit = form.handleSubmit(
    (value: AddActivity) => {
      addActivity({
        semesterId,
        data: { activityName: value.activityName },
      })
    },
    (errors) => {
      const errorMessage =
        Object.values(errors).flatMap((error) => error.message)[0] || ''

      setMessage(errorMessage)
    },
  )

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: activityQueries.all() })

    form.setValue('activityName', '')
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex w-full items-end gap-4">
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
          <Button type="submit" disabled={isPending}>
            추가하기
          </Button>
        </form>
      </Form>
      {message && (
        <div className="pl-1 pt-1 text-sm text-destructive">{message}</div>
      )}
    </div>
  )
}
