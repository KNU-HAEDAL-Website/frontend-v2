import { useEffect } from 'react'

import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import { Button, ToastAction, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import {
  approveMemberAction,
  rejectMemberAction,
} from '@/service/server/user/approve-member'

type ApproveMemberButtonProps = {
  userId: string
}

export const ApproveMemberButton = ({ userId }: ApproveMemberButtonProps) => {
  const {
    execute: approveMember,
    result: resultApprove,
    isExecuting: isExecutingApprove,
  } = useAction(approveMemberAction)

  const {
    execute: rejectMember,
    result: resultReject,
    isExecuting: isExecutingReject,
  } = useAction(rejectMemberAction)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const result = resultApprove.data ?? resultReject.data

    if (result?.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })

      toast({
        title: result.message,
        duration: 1000,
      })

      return
    }

    if (result?.action === 'login') {
      toast({
        title: result.message,
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

    if (result) {
      toast({
        title: result.message,
        duration: 2000,
      })
    }
  }, [resultApprove, resultReject, toast, router])

  return (
    <div className="flex gap-3">
      <Button
        onClick={() => approveMember({ userId })}
        disabled={isExecutingApprove || isExecutingReject}
        className="h-fit w-14 py-1.5"
      >
        수락
      </Button>
      <Button
        variant="secondary"
        onClick={() => rejectMember({ userId })}
        disabled={isExecutingApprove || isExecutingReject}
        className="h-fit w-14 py-1.5 hover:bg-primary/5"
      >
        거절
      </Button>
    </div>
  )
}
