'use client'

import { useQuery } from '@tanstack/react-query'

import { activityQueries, semesterQueries } from '@/service/api'
import { useMyInfoStore } from '@/store/myInfo'

import {
  CreateBoardDetail,
  CreateBoardForm,
  CreateBoardHero,
  CreateBoardSkeleton,
} from './_components'

type CreateBoardPageParams = {
  params: {
    semesterId: string
    activityId: string
  }
}

const CreateBoardPage = ({ params }: CreateBoardPageParams) => {
  const { userName } = useMyInfoStore((state) => state.getMyInfo())

  const {
    data: semester,
    status,
    error,
  } = useQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )
  const { data: activities } = useQuery(
    activityQueries.list({ semesterId: Number(params.semesterId) }),
  )

  const currentActivity = activities?.find(
    (activity) => activity.activityId === Number(params.activityId),
  )

  if (!currentActivity?.activityName) return <CreateBoardSkeleton />

  if (status === 'pending') {
    return <CreateBoardSkeleton />
  }

  if (error) return <div>{error.message}</div>

  return (
    <div className="w-full pt-10">
      <CreateBoardHero />
      <CreateBoardDetail
        semesterName={semester.semesterName}
        activityName={currentActivity.activityName}
        userName={userName}
      />
      <CreateBoardForm activityId={Number(currentActivity.activityId)} />
    </div>
  )
}

export default CreateBoardPage
