import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { addCommentApi, commentQueries } from '@/service/api/comment'
import { CreateComment, CreateCommentSchema } from '@/service/schema'

interface CommentFormProps {
  postId: number
}

export const CommentForm = ({ postId }: CommentFormProps) => {
  const form = useForm<CreateComment>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      postId,
      commentContent: '',
    },
  })

  const { mutate: addComment, error } = useMutation({
    mutationFn: addCommentApi,
    onSuccess: () => onSuccess(),
  })

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: commentQueries.lists(postId) })
    form.reset()
  }

  if (error) throw error

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          addComment({ postId, data: values }),
        )}
        className="flex flex-col gap-1"
      >
        <FormField
          control={form.control}
          name="commentContent"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  className="h-20 bg-white"
                  placeholder="댓글을 작성하세요"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-end">
          <Button>작성하기</Button>
        </div>
      </form>
    </Form>
  )
}
