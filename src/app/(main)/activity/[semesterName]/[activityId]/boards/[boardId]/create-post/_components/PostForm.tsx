'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import { CreatePostForm } from '@/components/feature'
import { useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { CreateActivityPost, CreateActivityPostSchema } from '@/schema/post'
import { createActivityPostAction } from '@/service/server/post/create-post'

type CreateActivityPostFormProps = {
  boardId: number
}

export const CreateActivityPostForm = ({
  boardId,
}: CreateActivityPostFormProps) => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const basePath = pathName.split('/').slice(0, -1).join('/')

  const {
    execute: createPost,
    result,
    isExecuting,
  } = useAction(createActivityPostAction)

  const form = useForm<CreateActivityPost>({
    resolver: zodResolver(CreateActivityPostSchema),
    defaultValues: {
      boardId,
      postTitle: '',
      postContent: '',
      activityDate: {
        start: undefined,
        end: undefined,
      },
    },
  })

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 3000,
      })

      queryClient.invalidateQueries({ queryKey: ['posts', 'ACTIVITY'] })
      router.push(basePath)

      return
    }

    if (result.data?.message) {
      toast({
        title: result.data.message,
        duration: 3000,
      })
    }
  }, [result, basePath, boardId, router, toast])

  return (
    <CreatePostForm
      form={form}
      onSubmit={(values) => createPost(values)}
      isExecuting={isExecuting}
      isImageRequired={false}
    />
  )
}
