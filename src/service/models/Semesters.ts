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
  GetActivitiesData,
  GetSemesterData,
  GetSemestersData,
} from './data-contracts'
import { RequestParams } from './http-client'

export class Semesters<
  SecurityDataType = unknown,
> extends CustomHttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags 학기 API
   * @name GetSemesters
   * @summary 학기 전체 조회
   * @request GET:/semesters
   * @secure
   * @response `200` `GetSemestersData` OK
   */
  getSemesters = (params: RequestParams = {}) =>
    this.request<GetSemestersData, any>({
      path: `/semesters`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 학기 API
   * @name GetSemester
   * @summary 학기 단일 조회
   * @request GET:/semesters/{semesterId}
   * @secure
   * @response `200` `GetSemesterData` OK
   */
  getSemester = (semesterId: number, params: RequestParams = {}) =>
    this.request<GetSemesterData, any>({
      path: `/semesters/${semesterId}`,
      method: 'GET',
      secure: true,
      ...params,
    })
  /**
   * No description
   *
   * @tags 활동 API
   * @name GetActivities
   * @summary 해당 학기 활동 조회
   * @request GET:/semesters/{semesterId}/activities
   * @secure
   * @response `200` `GetActivitiesData` OK
   */
  getActivities = (semesterId: number, params: RequestParams = {}) =>
    this.request<GetActivitiesData, any>({
      path: `/semesters/${semesterId}/activities`,
      method: 'GET',
      secure: true,
      ...params,
    })
}
