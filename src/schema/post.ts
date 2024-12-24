'use client'

import { z } from 'zod'

export const CreateActivityPostSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: '게시글 제목을 입력해주세요.' })
    .max(50, { message: '게시글 제목은 50자 이내여야 합니다.' }),
  postContent: z.string().min(1, { message: '게시글 내용을 입력해주세요.' }),
  activityDate: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .refine((date) => {
      return !!date.start
    }, '활동 날짜를 선택해주세요.'),
  postType: z.enum(['ACTIVITY', 'NOTICE']),
})

export type CreateActivityPost = z.infer<typeof CreateActivityPostSchema>

export const CreateNoticePostSchema = z.object({
  postTitle: z
    .string()
    .min(1, { message: '게시글 제목을 입력해주세요.' })
    .max(50, { message: '게시글 제목은 50자 이내여야 합니다.' }),
  postContent: z.string().min(1, { message: '게시글 제목을 입력해주세요.' }),
  postType: z.string(),
})

export type CreateNoticePost = z.infer<typeof CreateNoticePostSchema>
