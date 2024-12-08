'use server'

import { AxiosError } from 'axios'
import { flattenValidationErrors } from 'next-safe-action'
import { z } from 'zod'

import { API_ERROR_MESSAGES } from '@/constant/errorMessage'
import { actionClient } from '@/lib/safe-action'
import { BACKEND_API } from '@/service/config'

const LoginServerSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
})

export const loginAction = actionClient
  .schema(LoginServerSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput: { userId, password } }) => {
    try {
      const res = await BACKEND_API.post('/login', { userId, password })

      const accessToken = res.headers['authorization']

      return { isSuccess: true, token: accessToken }
    } catch (error) {
      if (error instanceof AxiosError) {
        const res = error.response

        if (res?.status === 400 || res?.status === 401) {
          return { message: res.data.message, status: res.status }
        }
      }

      return { message: API_ERROR_MESSAGES.UNKNOWN_ERROR }
    }
  })
