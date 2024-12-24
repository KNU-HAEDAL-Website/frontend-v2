import { z } from 'zod'

export const ChangeRoleSchema = z.object({
  role: z.enum(['ROLE_ADMIN', 'ROLE_TEAM_LEADER', 'ROLE_MEMBER']),
})
export type ChangeRole = z.infer<typeof ChangeRoleSchema>

export const AddSemesterSchema = z.object({
  year: z.string().regex(/^20[0-9]{2}$/, {
    message: '잘못된 연도 입력입니다.',
  }),
  term: z.enum(['1', '2'], {
    errorMap: () => ({
      message: '1학기, 2학기 중에 하나를 입력해주세요.',
    }),
  }),
})
export type AddSemester = z.infer<typeof AddSemesterSchema>

export const AddActivitySchema = z.object({
  activityName: z.string().min(1, { message: '활동명을 입력해주세요.' }),
})
export type AddActivity = z.infer<typeof AddActivitySchema>
