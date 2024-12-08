'use client'

import { useGetActivities } from '@/service/data/activity'
import { useGetSemesters } from '@/service/data/semester'
import { useMyInfoStore } from '@/store/myInfo'

import {
  CreateBoardDetail,
  CreateBoardForm,
  CreateBoardHero,
  CreateBoardSkeleton,
} from './_components'

type CreateBoardPageParams = {
  params: {
    semesterName: string
    activityId: string
  }
}

const CreateBoardPage = ({ params }: CreateBoardPageParams) => {
  const { userName } = useMyInfoStore((state) => state.getMyInfo())

  const { semesters, status } = useGetSemesters()
  const currentSemester = semesters.find(
    (semester) => semester.semesterName === params.semesterName,
  )

  const { data: activities } = useGetActivities(currentSemester?.semesterId)
  const currentActivity = activities?.find(
    (activity) => activity.activityId === Number(params.activityId),
  )

  if (status === 'pending' || !currentActivity) return <CreateBoardSkeleton />

  return (
    <div className="w-full pt-10">
      <CreateBoardHero />
      <CreateBoardDetail
        semesterName={params.semesterName}
        activityName={currentActivity.activityName}
        userName={userName}
      />
      <CreateBoardForm activityId={Number(currentActivity.activityId)} />
    </div>
  )
}

export default CreateBoardPage
