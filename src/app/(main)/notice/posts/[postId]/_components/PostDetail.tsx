import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'

import { Button, Separator, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { NoticePostQuries, deleteNoticePostApi } from '@/service/api'
import { PostResponseDto } from '@/service/models'
import { useMyInfoStore } from '@/store/myInfo'

type NoticePostDetailProps = {
  post: PostResponseDto
}

export const NoticePostDetail = ({ post }: NoticePostDetailProps) => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  const { mutate: deleteNoticePost, isPending } = useMutation({
    mutationFn: deleteNoticePostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const { toast } = useToast()
  const router = useRouter()

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: NoticePostQuries.all() })
    router.push('/notice')
  }

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
          {role === 'ROLE_ADMIN' && (
            <Button
              onClick={() => deleteNoticePost({ postId: post.postId })}
              disabled={isPending}
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
