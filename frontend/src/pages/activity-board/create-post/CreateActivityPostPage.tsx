import { Suspense, useEffect } from 'react'
import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { NetworkError } from '@/components/common'
import { ActivityPageSkeleton } from '@/components/feature'
import { ACCESS_ERROR_MESSAGE } from '@/constant'
import { boardQueries } from '@/service/api'
import { useMyInfoStore } from '@/store'
import { Role } from '@/types'

import { CreateActivityPostForm, CreateActivityPostHero } from './components'

const CreateActivityPost = () => {
  const params = useParams()

  const { data: board } = useSuspenseQuery(
    boardQueries.detail({
      activityId: Number(params.activityId),
      boardId: Number(params.boardId),
    }),
  )

  const { role } = useMyInfoStore((state) => state.myInfo)

  useEffect(() => {
    if (!role?.includes(role as Role)) {
      throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)
    }
  }, [role])

  if (!board) return <NetworkError />

  return (
    <div className="flex w-full flex-col gap-6 pb-10">
      <CreateActivityPostHero boardName={board.boardName} />
      <CreateActivityPostForm boardId={Number(params.boardId)} />
    </div>
  )
}

export default function FetchCreateActivityPost() {
  return (
    <Suspense fallback={<ActivityPageSkeleton />}>
      <CreateActivityPost />
    </Suspense>
  )
}
