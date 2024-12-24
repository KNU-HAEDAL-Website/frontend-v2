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
  AddNoticePostData,
  CreatePostRequestDto,
  DeleteNoticePostData,
  GetActivityPostsData,
  GetPostData,
} from './data-contracts'
import { ContentType, RequestParams } from './http-client'

export class Posts<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetActivityPosts
   * @summary 공지사항, 이벤트 게시글 목록 조회
   * @request GET:/posts
   * @secure
   * @response `200` `GetActivityPostsData` OK
   * @response `404` `void`
   */
  getActivityPosts = (
    query: {
      postType: string
      /**
       * 조회 할 page, default: 0
       * @format int32
       * @default 0
       */
      page?: number
      /**
       * 한 번에 조회 할 page 수, default: 10
       * @format int32
       * @default 10
       */
      size?: number
    },
    params: RequestParams = {},
  ) =>
    this.request<GetActivityPostsData, void>({
      path: `/posts`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name AddNoticePost
   * @summary 공지사항, 이벤트 게시글 생성
   * @request POST:/posts
   * @secure
   * @response `200` `AddNoticePostData` OK
   * @response `201` `void`
   * @response `400` `void`
   * @response `404` `void`
   */
  addNoticePost = (data: CreatePostRequestDto, params: RequestParams = {}) =>
    this.request<AddNoticePostData, void>({
      path: `/posts`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name GetPost
   * @summary 게시글 단일 조회
   * @request GET:/posts/{postId}
   * @secure
   * @response `200` `GetPostData` OK
   * @response `404` `void`
   */
  getPost = (postId: number, params: RequestParams = {}) =>
    this.request<GetPostData, void>({
      path: `/posts/${postId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 게시글 API
   * @name DeleteNoticePost
   * @summary 공지사항, 이벤트 게시글 삭제
   * @request DELETE:/posts/{postId}
   * @secure
   * @response `200` `DeleteNoticePostData`
   * @response `404` `void`
   */
  deleteNoticePost = (postId: number, params: RequestParams = {}) =>
    this.request<DeleteNoticePostData, void>({
      path: `/posts/${postId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
}
