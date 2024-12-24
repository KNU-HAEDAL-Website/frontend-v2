'use client'

import { z } from 'zod'

export const CreateBoardSchema = z.object({
  boardName: z
    .string()
    .min(1, { message: '게시판 제목을 입력해주세요.' })
    .max(15, { message: '게시판 제목은 15자 이내여야 합니다.' }),
  boardIntro: z
    .string()
    .max(50, { message: '게시판 소개글은 50자 이내여야 합니다.' }),
  file: z
    .instanceof(File)
    .refine((f) => f.size < 5000000, {
      message: '이미지 파일 크기는 5MB 이하만 가능합니다.',
    })
    .refine((f) => !!f.name, {
      message: '게시판 대표 사진을 선택해주세요.',
    }),
  participants: z.string().array(),
})

export type CreateBoard = z.infer<typeof CreateBoardSchema>
