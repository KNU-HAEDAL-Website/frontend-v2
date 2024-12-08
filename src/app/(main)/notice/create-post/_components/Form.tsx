'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useRouter } from 'next/navigation'

import { CreatePostForm } from '@/components/feature'
import { useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { CreateNoticePost, CreateNoticePostSchema } from '@/schema/post'
import { createNoticePostAction } from '@/service/server/post/create-post'

export const CreateNoticePostForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const basePath = pathName.split('/').slice(0, -1).join('/')

  const {
    execute: createPost,
    result,
    isExecuting,
  } = useAction(createNoticePostAction)

  const form = useForm<CreateNoticePost>({
    resolver: zodResolver(CreateNoticePostSchema),
    defaultValues: {
      postTitle: '',
      postContent: '',
    },
  })

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 3000,
      })

      queryClient.invalidateQueries({ queryKey: ['posts', 'NOTICE'] })
      router.push(basePath)
      return
    }

    if (result.data?.message) {
      toast({
        title: result.data.message,
        duration: 3000,
      })
    }
  }, [result, basePath, router, toast])

  return (
    <CreatePostForm
      form={form}
      onSubmit={(values) => createPost(values)}
      isExecuting={isExecuting}
      isActivityDateRequired={false}
      isImageRequired={false}
    />
  )
}
