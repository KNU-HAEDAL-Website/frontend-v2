'use client'

import {
  ActivityPostListSection,
  BoardHero,
  CreatePostButton,
} from './_components'

type BoardPageParams = {
  params: {
    activityId: string
    boardId: string
  }
}

const BoardPage = ({ params }: BoardPageParams) => {
  return (
    <div className="flex w-full flex-col gap-10 pt-10">
      <BoardHero
        activityId={Number(params.activityId)}
        boardId={Number(params.boardId)}
      />
      <ActivityPostListSection boardId={Number(params.boardId)} />
      <CreatePostButton />
    </div>
  )
}

export default BoardPage
