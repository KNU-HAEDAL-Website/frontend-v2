'use client'

import { useFormContext } from 'react-hook-form'

import { BlockNoteView } from '@blocknote/mantine'
import '@blocknote/mantine/style.css'
import { useCreateBlockNote } from '@blocknote/react'

import { FormField, FormItem, FormMessage } from '@/components/ui'
import { CreateActivityPost } from '@/schema/post'

const PostContentFieldEditor = () => {
  const { control } = useFormContext<CreateActivityPost>()

  const editor = useCreateBlockNote()

  return (
    <FormField
      control={control}
      name="postContent"
      render={({ field }) => (
        <FormItem>
          <BlockNoteView
            editor={editor}
            onChange={() => field.onChange(JSON.stringify(editor.document))}
            className="h-[500px] overflow-auto rounded-md border pt-4"
          />
          <div className="flex justify-end">
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  )
}

export default PostContentFieldEditor
