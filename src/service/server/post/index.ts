import formatDateDistanceFromToday from '@/utils/date-distance'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import { PagaingRaw, Paging } from '@/service/types/paging'
import { Post, PostSlider, PostView } from '@/types/post'

interface PostsPaingResponseRaw extends PagaingRaw {
  content: Post[]
}

export interface PostsResponse extends Paging {
  posts: Post[]
}

type ActivityPostsPagingRequestParams = {
  boardId: number
  page?: number
  size?: number
}

export const getActivityPostsPaging = async (
  params: ActivityPostsPagingRequestParams,
): Promise<PostsResponse> => {
  const response = await BACKEND_API.get<PostsPaingResponseRaw>(
    getActivityPostsPath(params),
  )

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

const getActivityPostsPath = ({
  boardId,
  page,
  size,
}: ActivityPostsPagingRequestParams) => {
  const params = new URLSearchParams()

  if (page) params.append('page', page.toString())
  if (size) params.append('size', size.toString())

  return `/boards/${boardId}/posts?${params.toString()}`
}

type PostsPagingRequestParams = {
  postType: 'NOTICE' | 'EVENT'
  page?: number
  size?: number
}

export const getPostsPaging = async (
  params: PostsPagingRequestParams,
): Promise<PostsResponse> => {
  const response = await BACKEND_API.get<PostsPaingResponseRaw>(
    getPostsPath(params),
  )

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

const getPostsPath = ({ postType, page, size }: PostsPagingRequestParams) => {
  const params = new URLSearchParams()

  params.append('postType', postType)
  if (page) params.append('page', page.toString())
  if (size) params.append('size', size.toString())

  return `/posts?${params.toString()}`
}

type PostsSliderRequestParams = {
  page?: number
  size?: number
}

interface PostsSliderResponseRaw extends PagaingRaw {
  content: PostSlider[]
}

interface PostsSliderResponse extends Paging {
  posts: PostSlider[]
}

export const getPostsSlider = async (
  params: PostsSliderRequestParams,
): Promise<PostsSliderResponse> => {
  const response = await BACKEND_API.get<PostsSliderResponseRaw>(
    getPostsSliderPath(params),
  )

  const { data } = response

  return {
    posts: data.content,
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

const getPostsSliderPath = ({ page, size }: PostsSliderRequestParams) => {
  const params = new URLSearchParams()

  if (page) params.append('page', page.toString())
  if (size) params.append('size', size.toString())

  return `/posts/slider?${params.toString()}`
}

type generatePresignedUrlResposne = {
  preSignedUrl: string
  imageUrl: string
}

export const generatePresignedUrl = async () => {
  const response = await AUTHORIZATION_API.get<generatePresignedUrlResposne>(
    '/posts/generate-presigned-url',
  )

  return response.data
}

type PostRequestParams = {
  postId: number
}

export const getPost = async ({ postId }: PostRequestParams) => {
  const response = await BACKEND_API.get<PostView>(`/posts/${postId}`)

  return response.data
}
