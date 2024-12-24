'use client'

import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import { ActivitySemesterSkeleton } from '@/components/feature'
import { Button } from '@/components/ui'
import { semesterQueries } from '@/service/api'
import { useMyInfoStore } from '@/store/myInfo'
import { Semester } from '@/types/activity'

import {
  ActivityBoardList,
  ActivityHero,
  ActivityList,
  SemesterList,
} from './_components'
import { RedirectSemester } from './_components/semester/RedirectSemester'

type ActivityParams = {
  params: {
    semesterId: string
    activityId: string
  }
}

interface ActivityPageProps extends ActivityParams {
  semesters: Semester[]
}

const ActivityPage = ({ params, semesters }: ActivityPageProps) => {
  const pathName = usePathname()
  const router = useRouter()
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  const {
    data: semester,
    status,
    error,
  } = useQuery(
    semesterQueries.detail({ semesterId: Number(params.semesterId) }),
  )

  if (status === 'pending') return <ActivitiySkeleton />

  if (error) return <RedirectSemester semesters={semesters} />

  return (
    <div className="flex flex-col items-center gap-2">
      <ActivityHero />
      <SemesterList semester={semester} semesters={semesters} />
      <div className="flex w-full flex-col items-center gap-6">
        <ActivityList
          semesterId={Number(params.semesterId)}
          activityId={Number(params.activityId)}
        />
        <ActivityBoardList activityId={Number(params.activityId)} />
        <div className="mb-20 flex w-full justify-end">
          <Button
            className="max-w-fit"
            onClick={() => router.push(`${pathName}/create-board`)}
            disabled={!(role === 'ROLE_ADMIN' || role === 'ROLE_TEAM_LEADER')}
          >
            게시판 생성하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function Activity({ params }: ActivityParams) {
  const { data: semesters, status } = useQuery(semesterQueries.list())

  if (status === 'pending') return <ActivitiySkeleton />
  if (!semesters) return <div>학기가 없습니다.</div>

  return <ActivityPage params={params} semesters={semesters} />
}

const ActivitiySkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <ActivityHero />
      <ActivitySemesterSkeleton />
    </div>
  )
}
