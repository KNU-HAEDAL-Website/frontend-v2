'use client'

import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

import {
  ActivitySemesterSkeleton,
  SemesterPagination,
} from '@/components/feature'
import { Button } from '@/components/ui'
import { useGetSemesters } from '@/service/data/semester'
import { useMyInfoStore } from '@/store/myInfo'

import { ActivityBoardList, ActivityList } from './_components'

type ActivityPageParams = {
  params: {
    semesterName: string
    activityId: string
  }
}

const ActivityPage = ({ params }: ActivityPageParams) => {
  const pathName = usePathname()
  const router = useRouter()

  const { role } = useMyInfoStore((state) => state.getMyInfo())

  const { semesters, status } = useGetSemesters()
  const semester = semesters.find(
    (semester) => semester.semesterName === params.semesterName,
  )
  if (!semester) return <ActivitySemesterSkeleton />

  if (status === 'pending') return <ActivitySemesterSkeleton />

  return (
    <div className="flex flex-col items-center gap-2">
      <SemesterPagination
        semesterName={params.semesterName}
        semesters={semesters}
      />
      <div className="flex w-full flex-col items-center gap-6">
        <ActivityList
          semesterId={semester.semesterId}
          activityId={Number(params.activityId)}
        />
        <ActivityBoardList activityId={Number(params.activityId)} />
        <div className="mb-20 flex w-full justify-end">
          <Button
            className="max-w-fit"
            onClick={() => router.push(`${pathName}/create-board`)}
            disabled={!(role === '해구르르' || role === '팀장')}
          >
            게시판 생성하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ActivityPage
