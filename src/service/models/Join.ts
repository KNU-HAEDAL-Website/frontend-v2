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
  CheckStudentNumberDuplicateData,
  CheckUserIdDuplicateData,
  EmailRequestDto,
  EmailVerificationCodeRequestDto,
  JoinRequestDto,
  ResisterAdminData,
  ResisterUserData,
  SendVerificationCodeData,
  VerifyCodeData,
} from './data-contracts'
import { ContentType, RequestParams } from './http-client'

export class Join<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name ResisterUser
   * @summary 회원가입
   * @request POST:/join
   * @secure
   * @response `200` `ResisterUserData` OK
   * @response `201` `void`
   * @response `404` `void`
   * @response `409` `void`
   */
  resisterUser = (data: JoinRequestDto, params: RequestParams = {}) =>
    this.request<ResisterUserData, void>({
      path: `/join`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name VerifyCode
   * @summary 이메일 인증 코드 검증
   * @request POST:/join/email/verify
   * @secure
   * @response `200` `VerifyCodeData`
   * @response `400` `void`
   */
  verifyCode = (
    data: EmailVerificationCodeRequestDto,
    params: RequestParams = {},
  ) =>
    this.request<VerifyCodeData, void>({
      path: `/join/email/verify`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name SendVerificationCode
   * @summary 이메일 인증 코드 전송/재전송
   * @request POST:/join/email/send
   * @secure
   * @response `200` `SendVerificationCodeData` OK
   * @response `201` `void`
   * @response `409` `void`
   * @response `429` `void`
   */
  sendVerificationCode = (data: EmailRequestDto, params: RequestParams = {}) =>
    this.request<SendVerificationCodeData, void>({
      path: `/join/email/send`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name ResisterAdmin
   * @summary 관리자 회원가입 (개발용)
   * @request POST:/join/admin
   * @secure
   * @response `200` `ResisterAdminData` OK
   * @response `201` `void`
   * @response `404` `void`
   * @response `409` `void`
   */
  resisterAdmin = (data: JoinRequestDto, params: RequestParams = {}) =>
    this.request<ResisterAdminData, void>({
      path: `/join/admin`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    })
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name CheckUserIdDuplicate
   * @summary ID 중복확인
   * @request GET:/join/check-user-id
   * @secure
   * @response `200` `CheckUserIdDuplicateData`
   * @response `409` `void`
   */
  checkUserIdDuplicate = (
    query: {
      /** 중복 확인할 ID */
      userId: string
    },
    params: RequestParams = {},
  ) =>
    this.request<CheckUserIdDuplicateData, void>({
      path: `/join/check-user-id`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
  /**
   * No description
   *
   * @tags 회원가입 관련 API
   * @name CheckStudentNumberDuplicate
   * @summary 학번 중복확인
   * @request GET:/join/check-student-number
   * @secure
   * @response `200` `CheckStudentNumberDuplicateData`
   * @response `409` `void`
   */
  checkStudentNumberDuplicate = (
    query: {
      /**
       * 중복 확인할 학번
       * @format int32
       */
      studentNumber: number
    },
    params: RequestParams = {},
  ) =>
    this.request<CheckStudentNumberDuplicateData, void>({
      path: `/join/check-student-number`,
      method: 'GET',
      query: query,
      secure: true,
      format: 'json',
      ...params,
    })
}
