import { useEffect } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import {
  ActivityBreadcrumb,
  BoardHeroSkeleton,
  NameLabel,
} from '@/components/feature'
import { Button, Separator, useToast } from '@/components/ui'
import { DATA_ERROR_MESSAGES } from '@/constant/errorMessage'
import { queryClient } from '@/lib/query-client'
import { boardDetailQuery } from '@/service/data/boards'
import { deleteBoardAction } from '@/service/server/board/delete-board'
import { useMyInfoStore } from '@/store/myInfo'

type BoardHeroProps = {
  activityId: number
  boardId: number
}

export const BoardHero = ({ boardId, activityId }: BoardHeroProps) => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())
  const { data: boardDetail, status } = useQuery(
    boardDetailQuery(activityId, boardId),
  )

  const {
    execute: deleteBoard,
    result,
    isExecuting,
  } = useAction(deleteBoardAction)
  const router = useRouter()
  const pathName = usePathname()
  const activityPath = pathName.split('/').slice(0, 4).join('/')
  const { toast } = useToast()

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 2000,
      })

      queryClient.invalidateQueries({ queryKey: ['boards', activityId] })
      router.push(activityPath)
      return
    }
  }, [result, router, toast, activityPath, activityId])

  if (status === 'pending') return <BoardHeroSkeleton />

  if (!boardDetail) throw new Error(DATA_ERROR_MESSAGES.BOARD_DETAIL_NOT_FOUND)

  return (
    <div className="flex flex-col">
      <Separator variant="dark" />
      <ActivityBreadcrumb
        navLinks={[]}
        pageName={`${boardDetail.boardName} 게시판`}
      />
      <div className="flex flex-col gap-1 pl-1 text-primary">
        <div className="text-2xl font-semibold">{boardDetail.boardName}</div>
        <div className="flex flex-wrap gap-2">
          {boardDetail.participants?.map((user) => (
            <NameLabel key={user.participantId} name={user.userName} />
          ))}
        </div>
        <div className="py-3 text-primary/70">{boardDetail.boardIntro}</div>
      </div>
      {role === '해구르르' && (
        <div className="flex justify-end">
          <Button
            variant="link"
            className="text-primary/60"
            onClick={() => deleteBoard({ boardId, activityId })}
            disabled={isExecuting}
          >
            게시판 삭제하기
          </Button>
        </div>
      )}
      <Separator variant="dark" />
    </div>
  )
}
