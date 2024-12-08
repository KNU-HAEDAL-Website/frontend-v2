'use server'

import { AxiosError } from 'axios'
import { flattenValidationErrors } from 'next-safe-action'
import { z } from 'zod'

import { API_ERROR_MESSAGES } from '@/constant/errorMessage'
import { actionClient } from '@/lib/safe-action'
import { BACKEND_API } from '@/service/config'

type SignupError = {
  field: string
  message: string
}

const SignupSchema = z
  .object({
    userId: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    studentNumber: z.string(),
    userName: z.string(),
    checked: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export const signupAction = actionClient
  .schema(SignupSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({ parsedInput: { userId, password, studentNumber, userName } }) => {
      try {
        const res = await BACKEND_API.post('/join', {
          userId,
          password,
          studentNumber: Number(studentNumber),
          userName,
        })

        return { status: res.status, message: res.data.message }
      } catch (error) {
        if (error instanceof AxiosError) {
          const res = error.response

          if (res?.status === 400) {
            return {
              message: res.data.message,
              status: res.status,
              errors: res.data.erros as SignupError,
            }
          }

          if (res?.status === 409) {
            return {
              message: res.data.message,
              status: res.status,
            }
          }
        }

        return { message: API_ERROR_MESSAGES.UNKNOWN_ERROR }
      }
    },
  )

export type CheckRespose = {
  success: boolean
  message: string
}

const UserIdSchema = z.object({
  userId: z
    .string()
    .min(6, { message: 'ID는 6자 이상이어야 합니다.' })
    .max(12, { message: 'ID는 12자 이하여야 합니다.' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'ID는 영어와 숫자만 입력할 수 있습니다.',
    }),
})

export const checkUserIdAction = actionClient
  .schema(UserIdSchema)
  .action(async ({ parsedInput: { userId } }) => {
    try {
      const res = await BACKEND_API.get<CheckRespose>(
        `/join/check-user-id?userId=${userId}`,
      )

      return res.data
    } catch (error) {
      return { success: false, message: API_ERROR_MESSAGES.UNKNOWN_ERROR }
    }
  })

const StudentNumberSchema = z.object({
  studentNumber: z.string().regex(/^[0-9]{10}$/, {
    message: '학번은 10글자 이어야 합니다.',
  }),
})

export const checkStudentNumberAction = actionClient
  .schema(StudentNumberSchema)
  .action(async ({ parsedInput: { studentNumber } }) => {
    try {
      const res = await BACKEND_API.get<CheckRespose>(
        `/join/check-student-number?studentNumber=${studentNumber}`,
      )

      return res.data
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          return { success: false, message: '유효하지 않은 학번입니다.' }
        }
      }
      return { success: false, message: API_ERROR_MESSAGES.UNKNOWN_ERROR }
    }
  })
