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
  GetProfileData,
  GetProfilesData,
  GetUserData,
  GetUsersData,
  ProfileRequestDto,
  UpdateProfileData,
  UpdateProfileImageData,
  UpdateProfileImagePayload,
} from './data-contracts'
import { ContentType, RequestParams } from './http-client'

export class Users<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 프로필 API
   * @name GetProfile
   * @summary 프로필 단일 조회
   * @request GET:/users/{userId}/profile
   * @secure
   * @response `200` `GetProfileData` OK
   * @response `404` `void`
   */
  getProfile = (userId: string, params: RequestParams = {}) =>
    this.request<GetProfileData, void>({
      path: `/users/${userId}/profile`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 프로필 API
   * @name UpdateProfile
   * @summary 프로필 수정
   * @request PUT:/users/{userId}/profile
   * @secure
   * @response `200` `UpdateProfileData`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  updateProfile = (
    userId: string,
    data: ProfileRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<UpdateProfileData, void>({
      path: `/users/${userId}/profile`,
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
   * @tags 프로필 API
   * @name UpdateProfileImage
   * @summary 프로필 이미지 수정
   * @request PUT:/users/{userId}/profile/image
   * @secure
   * @response `200` `UpdateProfileImageData`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  updateProfileImage = (
    userId: string,
    data: UpdateProfileImagePayload,
    params: RequestParams = {},
  ) =>
    this.request<UpdateProfileImageData, void>({
      path: `/users/${userId}/profile/image`,
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
   * @tags 유저 API
   * @name GetUsers
   * @summary User 목록 조회 (학번 포함, 회원만)
   * @request GET:/users
   * @secure
   * @response `200` `GetUsersData` OK
   * @response `404` `void`
   */
  getUsers = (params: RequestParams = {}) =>
    this.request<GetUsersData, void>({
      path: `/users`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 유저 API
   * @name GetUser
   * @summary User 조회 (학번 포함, 회원만)
   * @request GET:/users/{userId}
   * @secure
   * @response `200` `GetUserData` OK
   * @response `404` `void`
   */
  getUser = (userId: string, params: RequestParams = {}) =>
    this.request<GetUserData, void>({
      path: `/users/${userId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 프로필 API
   * @name GetProfiles
   * @summary 프로필 페이징 조회
   * @request GET:/users/profiles
   * @secure
   * @response `200` `GetProfilesData` OK
   */
  getProfiles = (
    query: {
      /**
       * 페이지 번호 (0부터 시작)
       * @format int32
       * @default 0
       * @example 0
       */
      page?: number
      /**
       * 페이지 크기
       * @format int32
       * @default 5
       * @example 5
       */
      size?: number
      /**
       * 조회할 역할 목록 컴마로 여러개 전달 가능 (ex: ROLE_ADMIN,ROLE_TEAM_LEADER,ROLE_MEMBER)
       * @example "ROLE_ADMIN,ROLE_TEAM_LEADER"
       */
      roles: (
        | 'ROLE_WEB_MASTER'
        | 'ROLE_ADMIN'
        | 'ROLE_TEAM_LEADER'
        | 'ROLE_MEMBER'
      )[]
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProfilesData, any>({
      path: `/users/profiles`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
}
