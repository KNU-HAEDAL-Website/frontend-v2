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
import { CustomHttpClient } from '@/servicetest/config'

import { GetMeData } from './data-contracts'
import { RequestParams } from './http-client'

export class Users<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 유저 API
   * @name GetMe
   * @summary User Me 정보 조회
   * @request GET:/users/me
   * @secure
   * @response `200` `GetMeData` OK
   */
  getMe = (params: RequestParams = {}) =>
    this.request<GetMeData, any>({
      path: `/users/me`,
      method: 'GET',
      secure: true,
      ...params,
    })
}