'use client'

import { ActivitySemesterSkeleton } from '@/components/feature'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui'
import { cn } from '@/lib/utils'
import { Semester } from '@/types/activity'

type SemesterPaginationProps = {
  semesterName: string
  semesters: Semester[]
}

export const SemesterPagination = ({
  semesterName,
  semesters,
}: SemesterPaginationProps) => {
  const currentSemester = semesters.find(
    (semester) => semester.semesterName === semesterName,
  )
  if (!currentSemester) return <ActivitySemesterSkeleton />

  const previousIndex = Math.max((currentSemester.index ?? 0) - 1, 0)
  const nextIndex = Math.min(
    (currentSemester.index ?? semesters.length - 1) + 1,
    semesters.length - 1,
  )

  const visibleSemesters = getVisibleSemesterList(semesters, currentSemester)

  return (
    <Pagination className="pt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/activity/${semesters[previousIndex].semesterName}`}
            disabled={currentSemester?.index === 0}
          />
        </PaginationItem>
        <PaginationItem>
          {visibleSemesters?.map((semester) => {
            const isActive =
              currentSemester?.semesterName === semester.semesterName

            return (
              <PaginationLink
                key={semester.semesterId}
                href={`/activity/${semester.semesterName}`}
                isActive={isActive}
                className={cn(!isActive && 'text-primary/60')}
              >
                {semester.semesterName}
              </PaginationLink>
            )
          })}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`/activity/${semesters[nextIndex].semesterName}`}
            disabled={currentSemester?.index === semesters.length - 1}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

const getVisibleSemesterList = (
  semesters: Semester[],
  currentSemester?: Semester,
) => {
  const currentIndex = currentSemester?.index ?? semesters.length - 1

  const endIndex = Math.min(semesters.length - 1, currentIndex + 1)
  const startIndex = Math.max(0, endIndex - 2)

  return semesters.slice(startIndex, startIndex + 3)
}
