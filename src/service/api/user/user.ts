import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import { GetUserRequest, Users } from '@/service/models'

const getUsers = async () => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getUsers()

  return response.data
}

const getUser = async ({ userId }: GetUserRequest) => {
  const userClient = new Users(AUTHORIZATION_API)
  const response = await userClient.getUser(userId)

  return response.data
}

export const UserQuries = {
  all: () => ['users'],
  lists: () => [...UserQuries.all(), 'list'],
  list: () =>
    queryOptions({
      queryKey: [...UserQuries.lists()],
      queryFn: async () => getUsers(),
    }),
  details: () => [...UserQuries.lists(), 'detail'],
  detail: ({ userId }: GetUserRequest) =>
    queryOptions({
      queryKey: [...UserQuries.details(), userId],
      queryFn: async () => getUser({ userId }),
    }),
}
