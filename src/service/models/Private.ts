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
import { GetUserData } from './data-contracts'
import { RequestParams } from './http-client'

export class Private<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 유저 API
   * @name GetUser
   * @summary User 목록 (학번 포함)
   * @request GET:/private/users
   * @secure
   * @response `200` `GetUserData` OK
   */
  getUser = (params: RequestParams = {}) =>
    this.request<GetUserData, any>({
      path: `/private/users`,
      method: 'GET',
      secure: true,
      ...params,
    })
}
