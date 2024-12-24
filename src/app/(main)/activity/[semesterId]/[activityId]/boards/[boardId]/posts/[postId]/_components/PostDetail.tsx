import { useMutation } from '@tanstack/react-query'
import { format } from 'date-fns'
import { usePathname, useRouter } from 'next/navigation'

import { Button, Separator, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { activityPostQuries, deleteActivityPostApi } from '@/service/api'
import { PostResponseDto } from '@/service/models'
import { useMyInfoStore } from '@/store/myInfo'

type ActivityPostDetailProps = {
  boardId: number
  post: PostResponseDto
}

export const ActivityPostDetail = ({
  boardId,
  post,
}: ActivityPostDetailProps) => {
  const { userName } = useMyInfoStore((state) => state.getMyInfo())

  const { mutate: deleteActivityPost, isPending } = useMutation({
    mutationFn: deleteActivityPostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({
      queryKey: activityPostQuries.board(boardId),
    })

    const boardPath = pathName.split('/').slice(0, -2).join('/')
    router.push(boardPath)
  }

  return (
    <div className="flex flex-col gap-3 py-4 text-primary">
      <div className="pt-4 text-4xl font-semibold">{post.postTitle}</div>
      <div className="flex justify-end">
        {userName === post.userName && (
          <Button
            onClick={() => deleteActivityPost({ boardId, postId: post.postId })}
            disabled={isPending}
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
