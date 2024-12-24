import formatDateDistanceFromToday from '@/utils/date-distance'
import { queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import {
  AddNoticePostRequest,
  DeleteNoticePostRequest,
  NoticePostPagingRequest,
  PostSummaryResponseDto,
  Posts,
} from '@/service/models'
import { Paging } from '@/types/paging'

import { PostQuries } from './post'

type NoticePostPagingResponse = {
  posts: PostSummaryResponseDto[]
} & Paging

const noticePostPaging = async ({
  page,
  size = 10,
}: NoticePostPagingRequest): Promise<NoticePostPagingResponse> => {
  const postClient = new Posts(BACKEND_API)
  const response = await postClient.getActivityPosts({
    postType: 'NOTICE',
    page,
    size,
  })

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

export const NoticePostQuries = {
  all: () => [...PostQuries.all(), 'notice'],
  list: ({ page, size }: NoticePostPagingRequest) =>
    queryOptions({
      queryKey: [...PostQuries.all(), page],
      queryFn: async () => noticePostPaging({ page, size }),
    }),
}

export const deleteNoticePostApi = async ({
  postId,
}: DeleteNoticePostRequest) => {
  const postClient = new Posts(AUTHORIZATION_API)
  const response = await postClient.deleteNoticePost(postId)

  return response.data
}

export const addNoticePostApi = async ({ data }: AddNoticePostRequest) => {
  const postClient = new Posts(AUTHORIZATION_API)
  const response = await postClient.addNoticePost(data)

  return response.data
}
