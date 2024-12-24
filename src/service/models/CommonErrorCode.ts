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

import { CommonErrorCodeDefinitionData } from './data-contracts'
import { HttpClient, RequestParams } from './http-client'

export class CommonErrorCode<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 공통 에러 코드 정의
   * @name CommonErrorCodeDefinition
   * @summary 가상의 에러 코드 엔드포인트 (동작하지 않습니다.)
   * @request POST:/common-error-code
   * @secure
   * @response `200` `CommonErrorCodeDefinitionData` OK
   * @response `400` `void`
   * @response `401` `void`
   */
  commonErrorCodeDefinition = (params: RequestParams = {}) =>
    this.request<CommonErrorCodeDefinitionData, void>({
      path: `/common-error-code`,
      method: 'POST',
      secure: true,
      ...params,
    })
}
