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
  ApproveUserData,
  ChangeUserRoleData,
  CreateActivityRequestDto,
  CreateSemesterRequestDto,
  ExpelUserData,
  GetUser1Data,
  RegisterActivityData,
  RegisterSemesterData,
  RejectUserData,
  RemoveActivityData,
  RemoveSemesterData,
  UpdateRoleRequestDto,
} from './data-contracts'
import { ContentType, RequestParams } from './http-client'

export class Admin<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 관리자 - 학기 관리 API
   * @name RegisterSemester
   * @summary 학기 추가
   * @request POST:/admin/semesters
   * @secure
   * @response `200` `RegisterSemesterData` OK
   * @response `201` `void`
   * @response `409` `void`
   */
  registerSemester = (
    data: CreateSemesterRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<RegisterSemesterData, void>({
      path: `/admin/semesters`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 활동 관리 API
   * @name RegisterActivity
   * @summary 활동 추가
   * @request POST:/admin/semesters/{semesterId}/activities
   * @secure
   * @response `200` `RegisterActivityData` OK
   * @response `201` `void`
   * @response `404` `void`
   */
  registerActivity = (
    semesterId: number,
    data: CreateActivityRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<RegisterActivityData, void>({
      path: `/admin/semesters/${semesterId}/activities`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 유저 관리 API
   * @name ChangeUserRole
   * @summary 유저 권한 변경
   * @request PATCH:/admin/users/{userId}/role
   * @secure
   * @response `200` `ChangeUserRoleData`
   * @response `404` `void`
   */
  changeUserRole = (
    userId: string,
    data: UpdateRoleRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<ChangeUserRoleData, void>({
      path: `/admin/users/${userId}/role`,
      method: 'PATCH',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 유저 관리 API
   * @name ExpelUser
   * @summary 유저 내보내기
   * @request PATCH:/admin/users/{userId}/expel
   * @secure
   * @response `200` `ExpelUserData`
   * @response `404` `void`
   */
  expelUser = (userId: string, params: RequestParams = {}) =>
    this.request<ExpelUserData, void>({
      path: `/admin/users/${userId}/expel`,
      method: 'PATCH',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 유저 관리 API
   * @name ApproveUser
   * @summary 가입 승인
   * @request PATCH:/admin/users/{userId}/approve
   * @secure
   * @response `200` `ApproveUserData`
   * @response `404` `void`
   */
  approveUser = (userId: string, params: RequestParams = {}) =>
    this.request<ApproveUserData, void>({
      path: `/admin/users/${userId}/approve`,
      method: 'PATCH',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 유저 관리 API
   * @name GetUser1
   * @summary User 목록
   * @request GET:/admin/users
   * @secure
   * @response `200` `GetUser1Data` OK
   */
  getUser1 = (
    query: {
      /** 활동 유저 true, 가입대기 유저 false */
      active: boolean
    },
    params: RequestParams = {},
  ) =>
    this.request<GetUser1Data, any>({
      path: `/admin/users`,
      method: 'GET',
      query: query,
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 유저 관리 API
   * @name RejectUser
   * @summary 가입 거절
   * @request DELETE:/admin/users/{userId}/reject
   * @secure
   * @response `200` `RejectUserData`
   * @response `404` `void`
   */
  rejectUser = (userId: string, params: RequestParams = {}) =>
    this.request<RejectUserData, void>({
      path: `/admin/users/${userId}/reject`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 학기 관리 API
   * @name RemoveSemester
   * @summary 학기 삭제
   * @request DELETE:/admin/semesters/{semesterId}
   * @secure
   * @response `200` `RemoveSemesterData`
   * @response `404` `void`
   * @response `409` `void`
   */
  removeSemester = (semesterId: number, params: RequestParams = {}) =>
    this.request<RemoveSemesterData, void>({
      path: `/admin/semesters/${semesterId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 관리자 - 활동 관리 API
   * @name RemoveActivity
   * @summary 활동 삭제
   * @request DELETE:/admin/semesters/{semesterId}/activities/{activityId}
   * @secure
   * @response `200` `RemoveActivityData`
   * @response `404` `void`
   * @response `409` `void`
   */
  removeActivity = (
    semesterId: number,
    activityId: number,
    params: RequestParams = {},
  ) =>
    this.request<RemoveActivityData, void>({
      path: `/admin/semesters/${semesterId}/activities/${activityId}`,
      method: 'DELETE',
      secure: true,
      format: 'json',
      ...params,
    })
}
