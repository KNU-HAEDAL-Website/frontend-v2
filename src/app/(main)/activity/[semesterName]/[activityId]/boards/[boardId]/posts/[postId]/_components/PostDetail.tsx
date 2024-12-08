import { useEffect } from 'react'

import { format } from 'date-fns'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import { Button, Separator, ToastAction, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { deleteActivityPostAction } from '@/service/server/post/delete-post'
import { useMyInfoStore } from '@/store/myInfo'
import { PostView } from '@/types/post'

type ActivityPostDetailProps = {
  boardId: number
  post: PostView
}

export const ActivityPostDetail = ({
  boardId,
  post,
}: ActivityPostDetailProps) => {
  const { userName } = useMyInfoStore((state) => state.getMyInfo())

  const {
    execute: deletePost,
    result,
    isExecuting,
  } = useAction(deleteActivityPostAction)

  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()
  const boardPath = pathName.split('/').slice(0, -2).join('/')

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 2000,
      })

      queryClient.invalidateQueries({ queryKey: ['posts', 'ACTIVITY'] })
      router.push(boardPath)
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
  }, [result, toast, router, boardPath])

  return (
    <div className="flex flex-col gap-3 py-4 text-primary">
      <div className="pt-4 text-4xl font-semibold">{post.postTitle}</div>
      <div className="flex justify-end">
        {userName === post.userName && (
          <Button
            onClick={() =>
              deletePost({ boardId: boardId, postId: post.postId })
            }
            disabled={isExecuting}
            variant="link"
            className="h-fit p-0 text-primary/60 hover:text-primary"
          >
            삭제하기
          </Button>
        )}
      </div>
      <div className="flex flex-col items-start gap-1 text-sm sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{post.userName}</div>
          <div>·</div>
          <div className="text-primary/60">
            {format(new Date(post.postCreateDate), 'yyyy-MM-dd')}
          </div>
          <div className="text-primary/60">조회 {post.postViews}</div>
        </div>
        <div className="flex">
          <div>활동일 {post.postActivityStartDate}</div>
          {post.postActivityEndDate && <div>~{post.postActivityEndDate}</div>}
        </div>
      </div>
      <Separator />
    </div>
  )
}
