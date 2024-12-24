import { queryOptions } from '@tanstack/react-query'

import { BACKEND_API } from '@/service/config'
import { GetPostDetailRequest, Posts } from '@/service/models'

const getPostDetail = async ({ postId }: GetPostDetailRequest) => {
  const postClient = new Posts(BACKEND_API)
  const response = await postClient.getPost(postId)

  return response.data
}

export const PostQuries = {
  all: () => ['posts'],
  detail: ({ postId }: GetPostDetailRequest) =>
    queryOptions({
      queryKey: [...PostQuries.all(), postId],
      queryFn: async () => getPostDetail({ postId }),
    }),
}
