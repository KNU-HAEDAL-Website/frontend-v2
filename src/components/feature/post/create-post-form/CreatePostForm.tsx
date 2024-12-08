import {
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form'

import dynamic from 'next/dynamic'

import { ImageInput, PostFormField } from '@/components/feature'
import { Button, Form, Input, Separator, Skeleton } from '@/components/ui'

import { ActivityDateFieldDialog } from './activity-date-dialog'

const PostContentFieldEditor = dynamic(() => import('./editor/EditorField'), {
  ssr: false,
  loading: () => <Skeleton className="h-[500px] w-full bg-slate-100" />,
})

type CreatePostFormProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  onSubmit: (values: T) => void
  isExecuting: boolean
  isActivityDateRequired?: boolean
  isImageRequired?: boolean
}

export const CreatePostForm = <T extends FieldValues>({
  form,
  onSubmit,
  isExecuting,
  isActivityDateRequired = true,
  isImageRequired = true,
}: CreatePostFormProps<T>) => {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <PostFormField name="postTitle" label="게시글 제목">
          {(field: ControllerRenderProps) => <Input {...field} />}
        </PostFormField>
        {isActivityDateRequired && <ActivityDateFieldDialog />}
        <Separator />
        <div>게시글 내용 작성하기</div>
        <PostContentFieldEditor />
        {isImageRequired && (
          <div className="flex flex-col gap-4">
            <Separator />
            <PostFormField name="imageFile" label="게시글 대표 사진">
              {(field) => <ImageInput field={field} />}
            </PostFormField>
          </div>
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isExecuting}>
            게시글 업로드
          </Button>
        </div>
      </form>
    </Form>
  )
}
