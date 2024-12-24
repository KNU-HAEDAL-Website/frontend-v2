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
import { SignInData } from './data-contracts'
import { RequestParams } from './http-client'

export class Logout<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 로그인 관련 API
   * @name SignIn
   * @summary 로그아웃 API
   * @request POST:/logout
   * @secure
   * @response `200` `SignInData`
   */
  signIn = (params: RequestParams = {}) =>
    this.request<SignInData, any>({
      path: `/logout`,
      method: 'POST',
      secure: true,
      format: 'json',
      ...params,
    })
}
