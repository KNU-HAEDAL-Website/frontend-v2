import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { ActivitySemesterSkeleton } from '@/components/feature'
import { Semester } from '@/types/activity'

interface RedirectSemesterProps {
  semesters: Semester[]
}
export const RedirectSemester = ({ semesters }: RedirectSemesterProps) => {
  const router = useRouter()

  useEffect(() => {
    const lastSemester = semesters[semesters.length - 1]

    router.push(`/activity/${lastSemester.semesterId}/-1`)
  }, [router, semesters])

  return <ActivitySemesterSkeleton />
}
