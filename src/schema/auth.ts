'use client'

import { z } from 'zod'

export const LoginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
})
export type Login = z.infer<typeof LoginSchema>

export const SignupSchema = z.object({
  userId: z
    .string()
    .min(6, { message: 'ID는 6자 이상이어야 합니다.' })
    .max(12, { message: 'ID는 12자 이하여야 합니다.' })
    .regex(/^[A-Za-z0-9]+$/, {
      message: 'ID는 영어와 숫자만 입력할 수 있습니다.',
    }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상이어야 합니다.' })
    .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,20}$/, {
      message: '비밀번호는 영문, 숫자, 특수문자를 혼용하여 설정해야 합니다.',
    }),
  confirmPassword: z.string(),
  email: z.string(),
  studentNumber: z.string().regex(/^[0-9]{10}$/, {
    message: '학번은 10자여야 합니다.',
  }),
  userName: z
    .string()
    .min(2, { message: '이름은 2자 이상이어야 합니다.' })
    .max(5, { message: '이름은 5자 이하이어야 합니다.' }),
  checked: z.literal<boolean>(true, {
    errorMap: () => ({
      message: '안내 문구를 확인해주세요.',
    }),
  }),
})

export type Signup = z.infer<typeof SignupSchema>

export const UserIdSchema = z
  .string()
  .min(6, { message: 'ID는 6자 이상이어야 합니다.' })
  .max(12, { message: 'ID는 12자 이하여야 합니다.' })
  .regex(/^[A-Za-z0-9]+$/, {
    message: 'ID는 영어와 숫자만 입력할 수 있습니다.',
  })
