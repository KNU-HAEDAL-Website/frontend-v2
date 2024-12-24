import { keepPreviousData, queryOptions } from '@tanstack/react-query'

import { AUTHORIZATION_API, BACKEND_API } from '@/service/config'
import {
  Activities,
  AddBoardRequest,
  BoardDetailRequest,
  BoardPagingRequest,
  BoardResponseDto,
  DeleteBoardRequest,
} from '@/service/models'
import { Paging } from '@/types/paging'

type BoardPagingResponse = {
  boards: BoardResponseDto[]
} & Paging

const getBoardsPaging = async ({
  activityId,
  page,
  size = 10,
}: BoardPagingRequest): Promise<BoardPagingResponse> => {
  const boardsClient = new Activities(BACKEND_API)
  const response = await boardsClient.getBoards(activityId, { page, size })

  const { data } = response

  return {
    boards: data.content,
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

const getBoardDetail = async ({ activityId, boardId }: BoardDetailRequest) => {
  const boardsClient = new Activities(BACKEND_API)
  const response = await boardsClient.getBoard(activityId, boardId)

  return response.data
}

export const boardQueries = {
  all: () => ['boards'],
  lists: (activityId: number) => [...boardQueries.all(), 'lists', activityId],
  list: ({ activityId, page, size }: BoardPagingRequest) =>
    queryOptions({
      queryKey: [...boardQueries.lists(activityId), page],
      queryFn: async () => getBoardsPaging({ activityId, page, size }),
      placeholderData: keepPreviousData,
    }),
  details: () => [...boardQueries.all(), 'details'],
  detail: ({ activityId, boardId }: BoardDetailRequest) =>
    queryOptions({
      queryKey: [...boardQueries.details(), activityId, boardId],
      queryFn: async () => getBoardDetail({ activityId, boardId }),
    }),
}

export const deleteBoardApi = async ({
  activityId,
  boardId,
}: DeleteBoardRequest) => {
  const boardsClient = new Activities(AUTHORIZATION_API)
  const response = await boardsClient.deleteBoard(activityId, boardId)

  return response.data
}

export const addBoardApi = async ({ activityId, data }: AddBoardRequest) => {
  const boardsClient = new Activities(AUTHORIZATION_API)
  const response = await boardsClient.registerBoard(activityId, data)

  return response.data
}
