import { useParams } from 'react-router'

import { useSuspenseQuery } from '@tanstack/react-query'

import { NotFoundError } from '@/components/common'
import { activityQueries, semesterQueries } from '@/service/api'

import { ActivityHero, ActivityList } from '../components'
import {
  ActivityBoardList,
  CreateBoardButton,
  SemesterList,
} from './components'

export default function ActivityPage() {
  const params = useParams()

  const { data: semesters } = useSuspenseQuery(semesterQueries.list())
  const { data: semester } = useSuspenseQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )
  const { data: activities } = useSuspenseQuery(
    activityQueries.list({ semesterId: Number(params.semesterId) }),
  )

  if (activities.length === 0 && Number(params.activityId) !== -1) {
    return <NotFoundError />
  }

  if (activities.length === 0) {
    return (
      <div className="flex w-full flex-col items-center gap-2">
        <ActivityHero />
        <SemesterList semester={semester} semesters={semesters} />
        <div>활동이 없습니다.</div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col items-center gap-2">
      <ActivityHero />
      <SemesterList semester={semester} semesters={semesters} />
      <div className="flex w-full flex-col items-center gap-6">
        <ActivityList
          activities={activities}
          activityId={Number(params.activityId)}
        />
        <ActivityBoardList activityId={Number(params.activityId)} />
        <div className="mb-20 flex w-full justify-end">
          <CreateBoardButton />
        </div>
      </div>
    </div>
  )
}
