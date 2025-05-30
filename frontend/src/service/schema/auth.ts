import { z } from 'zod'

export const LoginSchema = z.object({
  userId: z.string().min(1, { message: '아이디를 입력해주세요' }),
  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
})
export type Login = z.infer<typeof LoginSchema>

export const SignupSchema = z.object({
  userId: z
    .string()
    .min(6, { message: 'ID는 6자 이상여야 합니다.' })
    .max(12, { message: 'ID는 12자 이하여야 합니다.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/, {
      message: 'ID는 영어와 숫자를 혼용하여 설정해야 합니다.',
    }),
  password: z
    .string()
    .min(8, { message: '비밀번호는 8자 이상여야 합니다.' })
    .max(20, { message: '비밀번호는 20자 이하여야 합니다.' })
    .regex(/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()])(?=.*[0-9]).{8,20}$/, {
      message: '비밀번호는 영문, 숫자, 특수문자를 혼용하여 설정해야 합니다.',
    }),
  confirmPassword: z.string(),
  email: z
    .string()
    .email({ message: '이메일 형식이 올바르지 않습니다.' })
    .min(1, { message: '이메일을 입력해주세요.' }),
  code: z.string().length(6, { message: '코드 형식이 올바르지 않습니다.' }),
  studentNumber: z.string().length(10, {
    message: '학번은 10자여야 합니다.',
  }),
  userName: z
    .string()
    .min(2, { message: '이름은 2자 이상여야 합니다.' })
    .max(5, { message: '이름은 5자 이하여야 합니다.' }),
  checked: z.literal<boolean>(true, {
    errorMap: () => ({
      message: '안내 문구를 확인해주세요.',
    }),
  }),
  joinSemester: z.enum(
    [
      'SEMESTER_2024_1',
      'SEMESTER_2024_2',
      'SEMESTER_2025_1',
      'SEMESTER_2025_2',
      'SEMESTER_2026_1',
      'SEMESTER_2026_2',
      'SEMESTER_2027_1',
      'SEMESTER_2027_2',
      'SEMESTER_2028_1',
      'SEMESTER_2028_2',
      'SEMESTER_2029_1',
      'SEMESTER_2029_2',
    ],
    {
      errorMap: () => ({
        message: '가입 학기를 선택해주세요.',
      }),
    },
  ),
})
export type Signup = z.infer<typeof SignupSchema>

export const FindUserIdSchema = z.object({
  studentNumber: z.string().length(10, {
    message: '학번은 10자여야 합니다.',
  }),
  userName: z
    .string()
    .min(2, { message: '이름은 2자 이상여야 합니다.' })
    .max(5, { message: '이름은 5자 이하여야 합니다.' }),
})
export type FindUserId = z.infer<typeof FindUserIdSchema>

export const ResetPasswordSchema = z.object({
  userId: z
    .string()
    .min(6, { message: 'ID는 6자 이상여야 합니다.' })
    .max(12, { message: 'ID는 12자 이하여야 합니다.' })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/, {
      message: 'ID는 영어와 숫자를 혼용하여 설정해야 합니다.',
    }),
  studentNumber: z.string().length(10, {
    message: '학번은 10자여야 합니다.',
  }),
})
export type ResetPassword = z.infer<typeof ResetPasswordSchema>

export const VerifyCodeSchema = z.object({
  code: z.string().length(6, { message: '코드 형식이 올바르지 않습니다.' }),
})
export type VerifyCode = z.infer<typeof VerifyCodeSchema>
