'use client'

import { z } from 'zod'

export const CreateMypageSchema = z.object({
  introduction: z
    .string()
    .min(1, { message: '한 줄 소개를 입력해주세요.' })
    .max(100, { message: '한 줄 소개는 100자 이내이어야 합니다.' }),

  socialInfo: z.object({
    github: z.string().optional(),
    instagram: z.string().optional(),
  }),

  profileImage: z
    .instanceof(File)
    .refine((file) => file.size < 5000000, {
      message: '프로필 이미지는 5MB 이하만 업로드할 수 있습니다.',
    })
    .refine((file) => !!file.name, {
      message: '프로필 이미지를 선택해주세요.',
    })
    .optional(), // 프로필 이미지는 선택 사항으로 처리
})

export type CreateMypage = z.infer<typeof CreateMypageSchema>
