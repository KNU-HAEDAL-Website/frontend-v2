import { queryOptions, skipToken } from '@tanstack/react-query'

import { BACKEND_API } from '@/service/config'
import { GetActivitiesRequest, Semesters } from '@/service/models'

const getActivities = async ({ semesterId }: GetActivitiesRequest) => {
  const semesterClient = new Semesters(BACKEND_API)
  const response = await semesterClient.getActivities(semesterId)

  return response.data
}

export const activityQueries = {
  all: () => ['activities'],
  lists: () => [...activityQueries.all(), 'list'],
  list: ({ semesterId }: GetActivitiesRequest) =>
    queryOptions({
      queryKey: [...activityQueries.lists(), semesterId],
      queryFn: semesterId ? () => getActivities({ semesterId }) : skipToken,
    }),
}
