import { queryOptions, useQuery } from '@tanstack/react-query'

import { getSemesters } from '@/service/server/semester'
import { Semester } from '@/types/activity'

export const semesterQuery = () =>
  queryOptions({
    queryKey: ['semesters'],
    queryFn: async () => getSemesters(),
  })

export const useGetSemesters = () => {
  const { data, status } = useQuery(semesterQuery())

  const semesters = data ? convertSemesterFormat(data) : []

  return { semesters, status }
}

export const convertSemesterFormat = (semesters: Semester[]): Semester[] => {
  return semesters.map((semester, index) => {
    const year = semester.semesterName.slice(0, 4)
    const term = semester.semesterName.slice(4)

    return {
      index,
      semesterId: semester.semesterId,
      semesterName: `${year}-${term}`,
    }
  })
}
