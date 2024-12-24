import { AUTHORIZATION_API } from '@/service/config'
import {
  AddSemesterRequest,
  Admin,
  DeleteSemesterRequest,
} from '@/service/models'

export const deleteSemesterApi = async ({
  semesterId,
}: DeleteSemesterRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.removeSemester(semesterId)

  return response.data
}

export const addSemesterApi = async ({ semesterName }: AddSemesterRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.registerSemester({ semesterName })

  return response.data
}
