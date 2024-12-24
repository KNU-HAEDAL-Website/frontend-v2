'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'

import { CreatePostForm } from '@/components/feature'
import { useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { CreateNoticePost, CreateNoticePostSchema } from '@/schema/post'
import { NoticePostQuries, addNoticePostApi } from '@/service/api'

export const CreateNoticePostForm = () => {
  const { toast } = useToast()
  const router = useRouter()
  const pathName = usePathname()

  const { mutate: addNoticePost, isPending } = useMutation({
    mutationFn: addNoticePostApi,
    onSuccess: (data) => onSuccess(data.message),
  })

  const form = useForm<CreateNoticePost>({
    resolver: zodResolver(CreateNoticePostSchema),
    defaultValues: {
      postTitle: '',
      postContent: '',
      postType: 'NOTICE',
    },
  })

  const onSuccess = (message?: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: NoticePostQuries.all() })

    const basePath = pathName.split('/').slice(0, -1).join('/')
    router.push(basePath)
  }

  return (
    <CreatePostForm
      form={form}
      onSubmit={(values) => addNoticePost({ data: values })}
      isExecuting={isPending}
      isActivityDateRequired={false}
      isImageRequired={false}
    />
  )
}
