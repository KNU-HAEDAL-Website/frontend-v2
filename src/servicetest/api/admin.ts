import { Admin } from '@/models'

import { AUTHORIZATION_API } from '../config'

export const deleteSemester = async (semesterId: number) => {
  const adminApi = new Admin(AUTHORIZATION_API)
  const response = await adminApi.removeSemester(semesterId)

  return response.data
}

export const addSemester = async (semesterName: string) => {
  const adminApi = new Admin(AUTHORIZATION_API)
  const response = await adminApi.registerSemester({ semesterName })

  return response.data
}
