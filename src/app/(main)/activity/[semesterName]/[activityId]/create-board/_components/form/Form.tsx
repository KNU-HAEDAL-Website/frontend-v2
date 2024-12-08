'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import {
  PostFormField as BoardFormField,
  ImageInput,
} from '@/components/feature'
import { Button, Form, Input, Textarea, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { CreateBoard, CreateBoardSchema } from '@/schema/board'
import { createBoardAction } from '@/service/server/board/create-board'
import { User } from '@/types/user'

import { SelectMemberInput } from './SelectMemberInput'

type CreateBoardFromProps = {
  activityId: number
}

export const CreateBoardForm = ({ activityId }: CreateBoardFromProps) => {
  const router = useRouter()
  const pathName = usePathname()

  const basePath = pathName.split('/').slice(0, -1).join('/')

  const {
    execute: createBoard,
    result,
    isExecuting,
  } = useAction(createBoardAction)
  const { toast } = useToast()

  const form = useForm<CreateBoard>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      activityId,
      boardName: '',
      boardIntro: '',
      imageFile: new File([], ''),
      participants: [],
    },
  })
  const [selectedMember, setSelectedMember] = useState<User[]>([])

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 3000,
      })

      queryClient.invalidateQueries({ queryKey: ['boards', activityId] })
      router.push(basePath)
    }
  }, [result, activityId, basePath, router, toast])

  const onSubmit = (form: CreateBoard) => {
    createBoard(form)
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 pb-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <BoardFormField name="boardName" label="게시판 제목">
          {(field) => (
            <Input {...field} placeholder="게시판 제목을 입력해주세요" />
          )}
        </BoardFormField>
        <BoardFormField name="boardIntro" label="게시판 소개">
          {(field) => (
            <Textarea {...field} placeholder="게시판 소개글을 작성해주세요" />
          )}
        </BoardFormField>
        <BoardFormField name="imageFile" label="게시판 대표 사진">
          {(field) => <ImageInput field={field} />}
        </BoardFormField>
        <BoardFormField name="participants" label="게시판 이용자">
          {(field) => (
            <SelectMemberInput
              {...field}
              selectedMember={selectedMember}
              setSelectedMember={setSelectedMember}
            />
          )}
        </BoardFormField>
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isExecuting}
            onClick={() =>
              form.setValue(
                'participants',
                selectedMember.map((member) => member.userId),
              )
            }
          >
            게시판 생성하기
          </Button>
        </div>
      </form>
    </Form>
  )
}
