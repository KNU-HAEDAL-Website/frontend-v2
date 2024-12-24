import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import {
  Button,
  DialogFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { ChangeRole, ChangeRoleSchema } from '@/schema/admin'
import { AdminUserQuries, changeRoleApi } from '@/service/api'
import { UserResponseDto } from '@/service/models'

import { RoleRadioGroup } from './RoleRadioGroup'

type ChangeRoleDialogFormProps = {
  user: UserResponseDto
}

export const ChangeRoleDialogForm = ({ user }: ChangeRoleDialogFormProps) => {
  const { mutate: changeRole, isPending } = useMutation({
    mutationFn: changeRoleApi,
    onSuccess: (data) => onSuccess(data.message),
  })
  const { toast } = useToast()

  const form = useForm<ChangeRole>({ resolver: zodResolver(ChangeRoleSchema) })

  const onSubmit = form.handleSubmit((values) => {
    changeRole({ userId: user.userId, data: { role: values.role } })
  })

  const onSuccess = (message: string) => {
    queryClient.invalidateQueries({
      queryKey: AdminUserQuries.filter({ isActive: true }),
    })

    toast({
      title: message,
      duration: 2000,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col space-y-2 pt-2">
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-5">
              <FormControl>
                <RoleRadioGroup
                  onChange={field.onChange}
                  disabledRole={user.role}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button type="submit" className="w-20" disabled={isPending}>
            변경하기
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}
