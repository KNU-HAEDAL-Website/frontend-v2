'use client'

import { useRouter } from 'next/navigation'

import {
  ActivitySemesterSkeleton,
  SemesterPagination,
} from '@/components/feature'
import { useGetSemesters } from '@/service/data/semester'

import { RedirectActivity } from './_components'

type RedirectActivityParams = {
  params: { semesterName: string }
}

const RedirectSemesterPage = ({ params }: RedirectActivityParams) => {
  const router = useRouter()
  const { semesters, status } = useGetSemesters()
  const currentSemester = semesters.find(
    (semester) => semester.semesterName === params.semesterName,
  )

  if (status === 'pending') return <ActivitySemesterSkeleton />

  if (params.semesterName === 'init') {
    const lastSemester = semesters[semesters.length - 1].semesterName

    router.push(`/activity/${lastSemester}`)
    return
  }

  if (!currentSemester) return <div>학기가 없습니다.</div>

  return (
    <div className="flex flex-col items-center gap-2">
      <SemesterPagination
        semesterName={params.semesterName}
        semesters={semesters}
      />
      <RedirectActivity semester={currentSemester} />
    </div>
  )
}

export default RedirectSemesterPage
