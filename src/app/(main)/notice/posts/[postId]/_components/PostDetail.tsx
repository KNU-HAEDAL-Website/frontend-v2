import { useEffect } from 'react'

import { format } from 'date-fns'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import { Button, Separator, ToastAction, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { deletePostAction } from '@/service/server/post/delete-post'
import { useMyInfoStore } from '@/store/myInfo'
import { PostView } from '@/types/post'

type NoticePostDetailProps = {
  post: PostView
}

export const NoticePostDetail = ({ post }: NoticePostDetailProps) => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  const {
    execute: deletePost,
    result,
    isExecuting,
  } = useAction(deletePostAction)

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 2000,
      })

      queryClient.invalidateQueries({ queryKey: ['posts', 'NOTICE'] })
      router.push('/notice')
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
  }, [result, toast, router])

  return (
    <div className="flex flex-col gap-3 py-4 text-primary">
      <div className="py-4 text-2xl font-semibold">{post.postTitle}</div>
      <div className="flex items-center justify-between gap-2 text-sm">
        <div className="font-semibold">{post.userName}</div>
        <div className="flex gap-2">
          <div className="text-primary/60">
            {format(new Date(post.postCreateDate), 'yyyy-MM-dd')}
          </div>
          <div className="text-primary/60">조회 {post.postViews}</div>
          {role === '해구르르' && (
            <Button
              onClick={() => deletePost({ postId: post.postId })}
              disabled={isExecuting}
              variant="link"
              className="h-fit p-0 text-primary/60 hover:text-primary"
            >
              삭제하기
            </Button>
          )}
        </div>
      </div>
      <Separator />
    </div>
  )
}
