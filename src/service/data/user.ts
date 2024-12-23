import { queryOptions, useQuery } from '@tanstack/react-query'

import { getAdminUsers, getUsers } from '@/service/server/user'

export const useGetUsers = () => {
  const {
    data: users,
    status,
    error,
  } = useQuery({
    queryKey: ['users', 'active'],
    queryFn: async () => getUsers(),
  })

  return { users, status, error }
}

export const activeUsersQuery = () =>
  queryOptions({
    queryKey: ['admin', 'users', 'active'],
    queryFn: () => getAdminUsers({ isActive: true }),
  })

export const useGetActiveUsers = () => {
  return useQuery(activeUsersQuery())
}

export const inActiveUsersQuery = () =>
  queryOptions({
    queryKey: ['admin', 'users', 'inactive'],
    queryFn: () => getAdminUsers({ isActive: false }),
  })

export const useGetInActiveUsers = () => {
  return useQuery(inActiveUsersQuery())
}
