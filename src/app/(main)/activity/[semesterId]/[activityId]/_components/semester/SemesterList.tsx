'use client'

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

type SemesterListProps = {
  semester: Semester
  semesters: Semester[]
}

export const SemesterList = ({ semester, semesters }: SemesterListProps) => {
  const previousIndex = Math.max((semester.index ?? 0) - 1, 0)
  const nextIndex = Math.min(
    (semester.index ?? semesters.length - 1) + 1,
    semesters.length - 1,
  )

  const visibleSemesters = getVisibleSemesterList(semesters, semester)

  return (
    <Pagination className="pt-3">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={`/activity/${semesters[previousIndex].semesterId}/-1`}
            disabled={semester?.index === 0}
          />
        </PaginationItem>
        <PaginationItem>
          {visibleSemesters?.map((visibleSemester) => {
            const isActive = semester.semesterId === visibleSemester.semesterId

            return (
              <PaginationLink
                key={visibleSemester.semesterId}
                href={`/activity/${visibleSemester.semesterId}/-1`}
                isActive={isActive}
                className={cn(!isActive && 'text-primary/60')}
              >
                {visibleSemester.semesterName}
              </PaginationLink>
            )
          })}
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href={`/activity/${semesters[nextIndex].semesterId}/-1`}
            disabled={semester.index === semesters.length - 1}
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
