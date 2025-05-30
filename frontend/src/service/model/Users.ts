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
import { ContentType, RequestParams } from '@/lib/http-client'

import { CustomHttpClient } from '../config'
import {
  GetJoinSemestersData,
  GetProfileData,
  GetProfilesData,
  GetUserData,
  GetUserIdData,
  GetUsersData,
  ProfileRequestDto,
  ResetPasswordData,
  ResetPasswordEmailCodeRequestDto,
  ResetPasswordRequestDto,
  UpdateProfileData,
  UpdateProfileImage1Data,
  UpdateProfileImageData,
  UpdateProfileImagePayload,
  VerifyResetPasswordCodeData,
} from './data-contracts'

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
   * @tags 프로필 API
   * @name UpdateProfileImage1
   * @summary 프로필 이미지 삭제
   * @request DELETE:/users/{userId}/profile/image
   * @secure
   * @response `200` `UpdateProfileImage1Data`
   * @response `401` `void`
   * @response `403` `void`
   * @response `404` `void`
   */
  deleteProfileImage = (userId: string, params: RequestParams = {}) =>
    this.request<UpdateProfileImage1Data, void>({
      path: `/users/${userId}/profile/image`,
      method: 'DELETE',
      secure: true,
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
      /** 가입학기로 필터링 (ex: SEMESTER_2024_1) */
      joinSemester?:
        | 'SEMESTER_2024_1'
        | 'SEMESTER_2024_2'
        | 'SEMESTER_2025_1'
        | 'SEMESTER_2025_2'
        | 'SEMESTER_2026_1'
        | 'SEMESTER_2026_2'
        | 'SEMESTER_2027_1'
        | 'SEMESTER_2027_2'
        | 'SEMESTER_2028_1'
        | 'SEMESTER_2028_2'
        | 'SEMESTER_2029_1'
        | 'SEMESTER_2029_2'
    },
    params: RequestParams = {},
  ) =>
    this.request<GetProfilesData, any>({
      path: `/users/profiles`,
      method: 'GET',
      query: {
        ...query,
        roles: query.roles.join(', '),
      },
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 유저 API
   * @name GetJoinSemesters
   * @summary 유저 가입 학기 목록 조회
   * @request GET:/users/join-semesters
   * @secure
   * @response `200` `GetJoinSemestersData` OK
   */
  getJoinSemesters = (params: RequestParams = {}) =>
    this.request<GetJoinSemestersData, any>({
      path: `/users/join-semesters`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 유저 API
   * @name GetUserId
   * @summary 아이디 찾기
   * @request GET:/users/find-id
   * @secure
   * @response `200` `GetUserIdData` OK
   * @response `404` `void`
   */
  getUserId = (
    query: {
      /** @format int32 */
      studentNumber: number
      name: string
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUserIdData, void>({
      path: `/users/find-id`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 유저 API
   * @name ResetPassword
   * @summary 비밀번호 찾기 (인증코드 전송)
   * @request POST:/users/password/reset
   * @secure
   * @response `200` `ResetPasswordData` OK
   * @response `201` `void`
   * @response `404` `void`
   * @response `429` `void`
   */
  resetPassword = (data: ResetPasswordRequestDto, params: RequestParams = {}) =>
    this.request<ResetPasswordData, void>({
      path: `/users/password/reset`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 유저 API
   * @name VerifyResetPasswordCode
   * @summary 비밀번호 찾기 (인증코드 확인 및 랜덤 비밀번호 전송)
   * @request PATCH:/users/password/verify
   * @secure
   * @response `200` `VerifyResetPasswordCodeData`
   * @response `400` `void`
   * @response `404` `void`
   */
  verifyResetPasswordCode = (
    data: ResetPasswordEmailCodeRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<VerifyResetPasswordCodeData, void>({
      path: `/users/password/verify`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
}
