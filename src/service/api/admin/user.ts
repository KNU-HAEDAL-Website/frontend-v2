import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API } from '@/service/config'
import {
  Admin,
  AdminUserRequest,
  ChangeRoleRequest,
  GetAdminUsersRequest,
} from '@/service/models'

export const changeRoleApi = async ({ userId, data }: ChangeRoleRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.changeUserRole(userId, data)

  return response.data
}

export const approveUserApi = async ({ userId }: AdminUserRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.approveUser(userId)

  return response.data
}

export const rejectUserApi = async ({ userId }: AdminUserRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.rejectUser(userId)

  return response.data
}

export const expelUserApi = async ({ userId }: AdminUserRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.expelUser(userId)

  return response.data
}

const getAdminUsers = async ({ active }: GetAdminUsersRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.getUser1({ active })

  return response.data
}

export const AdminUserQuries = {
  all: () => ['admin', 'users'],
  filter: ({ isActive }: { isActive: boolean }) => [
    ...AdminUserQuries.all(),
    isActive,
  ],
  active: () =>
    queryOptions({
      queryKey: [...AdminUserQuries.filter({ isActive: true })],
      queryFn: () => getAdminUsers({ active: true }),
    }),
  inactive: () =>
    queryOptions({
      queryKey: [...AdminUserQuries.filter({ isActive: false })],
      queryFn: () => getAdminUsers({ active: false }),
    }),
}
