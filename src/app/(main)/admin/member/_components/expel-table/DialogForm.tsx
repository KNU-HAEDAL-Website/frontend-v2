import { Dispatch, SetStateAction, useEffect } from 'react'

import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import { Button, ToastAction, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { activeUsersQuery } from '@/service/data/user'
import { expelMemberAction } from '@/service/server/user/expel-member'

type ExpelMemberDialogFormProps = {
  userId: string
  setDialogOpen: Dispatch<SetStateAction<boolean>>
}

export const ExpelMemberDialogForm = ({
  userId,
  setDialogOpen,
}: ExpelMemberDialogFormProps) => {
  const {
    execute: expelMember,
    result,
    isExecuting,
  } = useAction(expelMemberAction)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (result.data?.isSuccess) {
      const { queryKey } = activeUsersQuery()

      queryClient.invalidateQueries({ queryKey })

      toast({
        title: result.data.message,
        duration: 1000,
      })

      return
    }

    if (result.data?.action === 'login') {
      toast({
        title: result.data?.message,
        duration: 2000,
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

    if (result.data) {
      toast({
        title: result.data.message,
        duration: 2000,
      })
    }
  }, [result, toast, router])

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={() => setDialogOpen(false)}>
        취소하기
      </Button>
      <Button onClick={() => expelMember({ userId })} disabled={isExecuting}>
        내보내기
      </Button>
    </div>
  )
}
