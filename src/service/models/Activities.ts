/* eslint-disable */

/* tslint:disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */
import { CustomHttpClient } from '../config'
import {
  BoardRequestDto,
  DeleteBoardData,
  GetBoardData,
  GetBoardsData,
  RegisterBoardData,
  RegisterBoardPayload,
  UpdateBoardData,
  UpdateBoardImageData,
  UpdateBoardImagePayload,
} from './data-contracts'
import { ContentType, RequestParams } from './http-client'

export class Activities<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 게시판 API
   * @name GetBoard
   * @summary 게시판 단일 조회
   * @request GET:/activities/{activityId}/boards/{boardId}
   * @secure
   * @response `200` `GetBoardData` OK
   * @response `404` `void`
   */
  getBoard = (
    activityId: number,
    boardId: number,
    params: RequestParams = {},
  ) =>
    this.request<GetBoardData, void>({
      path: `/activities/${activityId}/boards/${boardId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시판 API
   * @name UpdateBoard
   * @summary 게시판 메타 데이터 수정
   * @request PUT:/activities/{activityId}/boards/{boardId}
   * @secure
   * @response `200` `UpdateBoardData`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  updateBoard = (
    activityId: number,
    boardId: number,
    data: BoardRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateBoardData, void>({
      path: `/activities/${activityId}/boards/${boardId}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시판 API
   * @name DeleteBoard
   * @summary 게시판 삭제
   * @request DELETE:/activities/{activityId}/boards/{boardId}
   * @secure
   * @response `200` `DeleteBoardData`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  deleteBoard = (
    activityId: number,
    boardId: number,
    params: RequestParams = {},
  ) =>
    this.request<DeleteBoardData, void>({
      path: `/activities/${activityId}/boards/${boardId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시판 API
   * @name UpdateBoardImage
   * @summary 게시판 이미지 수정
   * @request PUT:/activities/{activityId}/boards/{boardId}/image
   * @secure
   * @response `200` `UpdateBoardImageData`
   * @response `400` `void`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  updateBoardImage = (
    activityId: number,
    boardId: number,
    data: UpdateBoardImagePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateBoardImageData, void>({
      path: `/activities/${activityId}/boards/${boardId}/image`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시판 API
   * @name GetBoards
   * @summary 게시판 페이징 조회
   * @request GET:/activities/{activityId}/boards
   * @secure
   * @response `200` `GetBoardsData` OK
   * @response `404` `void`
   */
  getBoards = (
    activityId: number,
    query?: {
      /**
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * @format int32
       * @default 5
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetBoardsData, void>({
      path: `/activities/${activityId}/boards`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시판 API
   * @name RegisterBoard
   * @summary 게시판 생성
   * @request POST:/activities/{activityId}/boards
   * @secure
   * @response `200` `RegisterBoardData` OK
   * @response `201` `void`
   * @response `400` `void`
   * @response `401` `void`
   * @response `404` `void`
   */
  registerBoard = (
    activityId: number,
    data: RegisterBoardPayload,
    params: RequestParams = {},
  ) =>
    this.request<RegisterBoardData, void>({
      path: `/activities/${activityId}/boards`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    })
}
