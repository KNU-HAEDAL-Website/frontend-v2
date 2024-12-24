import { AUTHORIZATION_API } from '@/service/config'
import {
  AddActivityRequest,
  Admin,
  DeleteActivityRequest,
} from '@/service/models'

export const deleteActivityApi = async ({
  semesterId,
  activityId,
}: DeleteActivityRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.removeActivity(semesterId, activityId)

  return response.data
}

export const addActivityApi = async ({
  semesterId,
  data,
}: AddActivityRequest) => {
  const adminClient = new Admin(AUTHORIZATION_API)
  const response = await adminClient.registerActivity(semesterId, data)

  return response.data
}
