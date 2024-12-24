import formatDateDistanceFromToday from '@/utils/date-distance'
import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import {
  ActivityPostPagingRequest,
  AddActivityPostRequest,
  Boards,
  DeleteActivityPostRequest,
  PostSummaryResponseDto,
} from '@/service/models'
import { Paging } from '@/types/paging'

import { PostQuries } from './post'

type PostPagingResponse = {
  posts: PostSummaryResponseDto[]
} & Paging

const activityPostPaging = async ({
  boardId,
  page,
  size = 10,
}: ActivityPostPagingRequest): Promise<PostPagingResponse> => {
  const postClient = new Boards(BACKEND_API)
  const response = await postClient.getActivityPosts1(boardId, { page, size })

  const { data } = response

  const posts = data.content.map((post) => {
    const formatCreateDate = formatDateDistanceFromToday(
      new Date(post.postCreateDate),
    )

    if (!formatCreateDate) return post

    return {
      ...post,
      postCreateDate: formatCreateDate,
    }
  })

  return {
    posts,
    nextPageToken:
      data.pageable.pageNumber !== data.totalPages
        ? (data.pageable.pageNumber + 1).toString()
        : undefined,
    pageInfo: {
      totalPages: data.totalPages,
      totalElements: data.totalElements,
      pageSize: data.pageable.pageSize,
    },
  }
}

export const activityPostQuries = {
  all: () => [...PostQuries.all(), 'activity'],
  board: (boardId: number) => [...activityPostQuries.all(), boardId],
  list: ({ boardId, page, size }: ActivityPostPagingRequest) =>
    queryOptions({
      queryKey: [...activityPostQuries.board(boardId), page],
      queryFn: async () => activityPostPaging({ boardId, page, size }),
    }),
}

export const deleteActivityPostApi = async ({
  boardId,
  postId,
}: DeleteActivityPostRequest) => {
  const postClient = new Boards(AUTHORIZATION_API)
  const response = await postClient.deletePost(boardId, postId)

  return response.data
}

export const addActivityPostApi = async ({
  boardId,
  data,
}: AddActivityPostRequest) => {
  const postClient = new Boards(AUTHORIZATION_API)
  const response = await postClient.addPost(boardId, data)

  return response.data
}
