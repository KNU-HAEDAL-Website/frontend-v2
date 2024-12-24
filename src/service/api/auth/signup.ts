import { BACKEND_API } from '@/service/config'
import {
  CheckStudentNumberRequest,
  CheckUserIdRequest,
  Join,
  SignupRequest,
} from '@/service/models'

export const signupApi = async ({ data }: SignupRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.resisterUser(data)

  return response.data
}

export const checkUserIdApi = async ({ userId }: CheckUserIdRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.checkUserIdDuplicate({ userId })

  return response.data
}

export const checkStudentNumberApi = async ({
  studentNumber,
}: CheckStudentNumberRequest) => {
  const signupClient = new Join(BACKEND_API)
  const response = await signupClient.checkStudentNumberDuplicate({
    studentNumber,
  })

  return response.data
}
