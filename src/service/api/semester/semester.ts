import convertSemesterFormat from '@/utils/convert-semester'
import { queryOptions } from '@tanstack/react-query'

import { BACKEND_API } from '@/service/config'
import { GetSemesterRequest, Semesters } from '@/service/models'

const getSemesters = async () => {
  const semesterClient = new Semesters(BACKEND_API)
  const response = await semesterClient.getSemesters()

  return convertSemesterFormat(response.data)
}

const getSemester = async ({ semesterId }: GetSemesterRequest) => {
  const semesterClient = new Semesters(BACKEND_API)
  const response = await semesterClient.getSemester(semesterId)

  return convertSemesterFormat([response.data])[0]
}

export const semesterQueries = {
  all: () => ['semesters'],
  list: () =>
    queryOptions({
      queryKey: [...semesterQueries.all()],
      queryFn: async () => getSemesters(),
    }),
  details: () => [...semesterQueries.all(), 'detail'],
  detail: ({ semesterId }: GetSemesterRequest) =>
    queryOptions({
      queryKey: [...semesterQueries.details(), semesterId],
      queryFn: () => getSemester({ semesterId }),
    }),
}
