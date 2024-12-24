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

export interface ProfileRequestDto {
  /**
   * 프로필 소개
   * @minLength 0
   * @maxLength 127
   * @example "안녕하세요 반갑습니다"
   */
  profileIntro?: string
  /**
   * 깃허브 계정 id
   * @minLength 0
   * @maxLength 63
   */
  githubAccount?: string
  /**
   * 인스타그램 계정 id
   * @minLength 0
   * @maxLength 63
   */
  instaAccount?: string
}

export interface SuccessResponse {
  success?: boolean
  message?: string
}

export interface BoardRequestDto {
  /**
   * 게시판 이름
   * @minLength 1
   * @maxLength 15
   * @pattern ^[가-힣a-zA-Z0-9\s]*$
   * @example "게시판1"
   */
  boardName: string
  /**
   * 게시판 소개
   * @minLength 0
   * @maxLength 50
   * @example "이 게시판에 대한 소개글"
   */
  boardIntro?: string
  /**
   * 참여 인원 ID
   * @maxItems 2147483647
   * @minItems 1
   * @uniqueItems true
   */
  participants: string[]
}

export interface CreatePostRequestDto {
  /**
   * 게시글 이름
   * @minLength 1
   * @maxLength 50
   * @example "게시글1"
   */
  postTitle: string
  /**
   * @minLength 1
   * @maxLength 200000
   */
  postContent: string
  /**
   * 활동 시작일 (이벤트와 활동은 필수, 공지사항은 생략)
   * @example "yyyy-MM-dd (2024-07-24)"
   */
  postActivityStartDate?: string
  /**
   * 활동 종료일 (생략 가능)
   * @example "yyyy-MM-dd (2024-07-24)"
   */
  postActivityEndDate?: string
  /**
   * 게시글 타입
   * @example "(ACTIVITY, NOTICE)"
   */
  postType: string
}

export interface LoginRequestDto {
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 비밀번호
   * @example "abc1234!"
   */
  password: string
}

export interface JoinRequestDto {
  /**
   * 유저 아이디
   * @minLength 6
   * @maxLength 12
   * @pattern ^[A-Za-z0-9]+$
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 비밀번호
   * @pattern ^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,20}$
   * @example "abc1234!"
   */
  password: string
  /**
   * 이메일
   * @minLength 0
   * @maxLength 63
   * @example "haedal12@gmail.com"
   */
  email: string
  /**
   * 유저 학번
   * @format int32
   * @min 1900000000
   * @max 2100000000
   * @example 2024111234
   */
  studentNumber: number
  /**
   * 유저 이름
   * @minLength 2
   * @maxLength 5
   * @example "조대성"
   */
  userName: string
}

export interface EmailVerificationCodeRequestDto {
  /**
   * 이메일
   * @minLength 0
   * @maxLength 63
   * @example "haedal12@gmail.com"
   */
  email: string
  /**
   * 유저 아이디
   * @minLength 6
   * @maxLength 12
   * @pattern ^[A-Za-z0-9]+$
   * @example "haedal12"
   */
  userId: string
  /**
   * 인증 코드
   * @minLength 6
   * @maxLength 6
   * @example "ABcD12"
   */
  code: string
}

export interface EmailRequestDto {
  /**
   * 이메일
   * @minLength 0
   * @maxLength 63
   * @example "haedal12@gmail.com"
   */
  email: string
}

export interface CreateSemesterRequestDto {
  /**
   * 학기명
   * @pattern ^(20[0-9]{2}[12])$
   * @example "20231"
   */
  semesterName: string
}

export interface CreateActivityRequestDto {
  /**
   * 활동명
   * @minLength 0
   * @maxLength 15
   * @example "트랙"
   */
  activityName: string
}

export interface UpdateRoleRequestDto {
  /**
   * 유저 권한
   * @example "(ROLE_ADMIN, ROLE_TEAM_LEADER, ROLE_MEMBER)"
   */
  role: 'ROLE_WEB_MASTER' | 'ROLE_ADMIN' | 'ROLE_TEAM_LEADER' | 'ROLE_MEMBER'
}

export interface UserResponseDto {
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 학번
   * @format int32
   * @example 2024111234
   */
  studentNumber: number
  /**
   * 유저 이름
   * @example "조대성"
   */
  userName: string
  /**
   * 유저 권한
   * @example "(ROLE_WEB_MASTER, ROLE_ADMIN, ROLE_TEAM_LEADER, ROLE_MEMBER)"
   */
  role: 'ROLE_WEB_MASTER' | 'ROLE_ADMIN' | 'ROLE_TEAM_LEADER' | 'ROLE_MEMBER'
}

export interface ProfileResponseDto {
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 이름
   * @example "조대성"
   */
  userName: string
  /**
   * 유저 학번 (본인 전용)
   * @format int32
   * @example 2024111234
   */
  studentNumber: number
  /** 유저 이메일 (본인 전용) */
  email: string
  /**
   * 유저 권한
   * @example "(ROLE_WEB_MASTER, ROLE_ADMIN, ROLE_TEAM_LEADER, ROLE_MEMBER)"
   */
  role: 'ROLE_WEB_MASTER' | 'ROLE_ADMIN' | 'ROLE_TEAM_LEADER' | 'ROLE_MEMBER'
  /** 프로필 이미지 파일 Url */
  profileImageUrl?: string
  /** 프로필 소개 */
  userIntro?: string
  /** 깃허브 계정 id */
  githubAccount?: string
  /** 인스타그램 계정 id */
  instaAccount?: string
}

export interface PageProfileResponseDto {
  /** @format int32 */
  totalPages: number
  /** @format int64 */
  totalElements: number
  /** @format int32 */
  size?: number
  content?: ProfileResponseDto[]
  /** @format int32 */
  number?: number
  sort?: SortObject[]
  /** @format int32 */
  numberOfElements?: number
  pageable: PageableObject
  first?: boolean
  last?: boolean
  empty?: boolean
}

export interface PageableObject {
  /** @format int64 */
  offset?: number
  sort?: SortObject[]
  /** @format int32 */
  pageNumber: number
  /** @format int32 */
  pageSize: number
  paged?: boolean
  unpaged?: boolean
}

export interface SortObject {
  direction?: string
  nullHandling?: string
  ascending?: boolean
  property?: string
  ignoreCase?: boolean
}

export interface SemesterResponseDto {
  /**
   * 학기 id
   * @format int64
   */
  semesterId: number
  /** 학기명 */
  semesterName: string
}

export interface ActivityResponseDto {
  /**
   * 활동 id
   * @format int64
   */
  activityId: number
  /** 활동명 */
  activityName: string
  /**
   * 학기 id
   * @format int64
   */
  semesterId: number
}

export interface PagePostSummaryResponseDto {
  /** @format int32 */
  totalPages: number
  /** @format int64 */
  totalElements: number
  /** @format int32 */
  size?: number
  content: PostSummaryResponseDto[]
  /** @format int32 */
  number?: number
  sort?: SortObject[]
  /** @format int32 */
  numberOfElements?: number
  pageable: PageableObject
  first?: boolean
  last?: boolean
  empty?: boolean
}

export interface PostSummaryResponseDto {
  /**
   * 게시글 id
   * @format int64
   */
  postId: number
  /** 게시글 제목 */
  postTitle: string
  /**
   * 게시글 대표 이미지 파일 Url
   * @format url
   */
  postImageUrl?: string
  /**
   * 게시글 조회수
   * @format int64
   */
  postViews: number
  /**
   * 활동 시작일
   * @format date
   */
  postActivityStartDate?: string
  /**
   * 활동 종료일
   * @format date
   */
  postActivityEndDate?: string
  /**
   * 게시글 생성일
   * @format date-time
   */
  postCreateDate: string
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 이름
   * @example "조대성"
   */
  userName: string
  /**
   * 게시판 id
   * @format int64
   */
  boardId?: number
  /** 게시판 이름 */
  boardName?: string
}

export interface PostResponseDto {
  /**
   * 게시글 id
   * @format int64
   */
  postId: number
  /** 게시글 제목 */
  postTitle: string
  /** 게시글 내용 */
  postContent: string
  /** 게시글 대표 이미지 파일 Url */
  postImageUrl: string
  /**
   * 게시글 조회수
   * @format int64
   */
  postViews: number
  /**
   * 활동 시작일 (이벤트와 활동은 필수, 공지사항은 생략)
   * @format date
   */
  postActivityStartDate?: string
  /**
   * 활동 종료일 (생략 가능)
   * @format date
   */
  postActivityEndDate?: string
  /**
   * 게시글 생성일
   * @format date-time
   */
  postCreateDate: string
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 이름
   * @example "조대성"
   */
  userName: string
  /**
   * 게시판 id
   * @format int64
   */
  boardId?: number
  /** 게시판 이름 */
  boardName?: string
}

export interface AdminUserResponseDto {
  /**
   * 유저 아이디
   * @example "haedal12"
   */
  userId: string
  /**
   * 유저 학번
   * @format int32
   * @example 2024111234
   */
  studentNumber: number
  /**
   * 유저 이름
   * @example "조대성"
   */
  userName: string
  /**
   * 유저 권한
   * @example "(ROLE_WEB_MASTER, ROLE_ADMIN, ROLE_TEAM_LEADER, ROLE_MEMBER)"
   */
  role: 'ROLE_WEB_MASTER' | 'ROLE_ADMIN' | 'ROLE_TEAM_LEADER' | 'ROLE_MEMBER'
  /**
   * 가입 날짜
   * @format date-time
   */
  regDate: string
}

export interface BoardResponseDto {
  /**
   * 게시판 id
   * @format int64
   */
  boardId: number
  /** 게시판 이름 */
  boardName: string
  /** 게시판 소개 */
  boardIntro: string
  /** 게시판 대표 이미지 파일 Url */
  boardImageUrl: string
  /** 참여 인원 목록 */
  participants: ParticipantResponseDto[]
  /**
   * 활동 id
   * @format int64
   */
  activityId?: number
}

export interface PageBoardResponseDto {
  /** @format int32 */
  totalPages: number
  /** @format int64 */
  totalElements: number
  /** @format int32 */
  size?: number
  content: BoardResponseDto[]
  /** @format int32 */
  number?: number
  sort?: SortObject[]
  /** @format int32 */
  numberOfElements?: number
  pageable: PageableObject
  first?: boolean
  last?: boolean
  empty?: boolean
}

/** 참여 인원 목록 */
export interface ParticipantResponseDto {
  /** @format int64 */
  participantId: number
  userId: string
  userName: string
}

export type GetProfileData = ProfileResponseDto

export type UpdateProfileData = any

export interface UpdateProfileImagePayload {
  /** @format binary */
  file: File
}

export type UpdateProfileImageData = any

export type GetBoardData = BoardResponseDto

export type UpdateBoardData = any

export type DeleteBoardData = any

export interface UpdateBoardImagePayload {
  /** @format binary */
  file: File
}

export type UpdateBoardImageData = any

export type ReissueData = any

export type GetActivityPostsData = PagePostSummaryResponseDto

export type AddNoticePostData = SuccessResponse

export type SignInData = any

export type SignIn1Data = any

export type ResisterUserData = SuccessResponse

export type VerifyCodeData = any

export type SendVerificationCodeData = SuccessResponse

export type ResisterAdminData = SuccessResponse

export type CommonErrorCodeDefinitionData = any

export type GetActivityPosts1Data = PagePostSummaryResponseDto

export type AddPostData = SuccessResponse

export type RegisterSemesterData = SuccessResponse

export type RegisterActivityData = SuccessResponse

export type GetBoardsData = PageBoardResponseDto

export interface RegisterBoardPayload {
  /** @format binary */
  file: File
  boardRequestDto: BoardRequestDto
}

export type RegisterBoardData = SuccessResponse

export type ChangeUserRoleData = any

export type ExpelUserData = any

export type ApproveUserData = any

export type GetUsersData = UserResponseDto[]

export type GetUserData = UserResponseDto

export type GetProfilesData = PageProfileResponseDto

export type GetSemestersData = SemesterResponseDto[]

export type GetSemesterData = SemesterResponseDto

export type GetActivitiesData = ActivityResponseDto[]

export type GetActivityData = ActivityResponseDto

export type GetPostData = PostResponseDto

export type DeleteNoticePostData = any

export type CheckUserIdDuplicateData = any

export type CheckStudentNumberDuplicateData = any

export type GetUser1Data = AdminUserResponseDto[]

export type MainPData = string

export type DeletePostData = any

export type RejectUserData = any

export type RemoveSemesterData = any

export type RemoveActivityData = any

/** request type */
export interface GetActivitiesRequest {
  semesterId: number
}

export interface DeleteActivityRequest {
  semesterId: number
  activityId: number
}

export interface AddActivityRequest {
  semesterId: number
  data: CreateActivityRequestDto
}

export interface DeleteSemesterRequest {
  semesterId: number
}

export interface AddSemesterRequest {
  semesterName: string
}

export interface ChangeRoleRequest {
  userId: string
  data: UpdateRoleRequestDto
}

export interface AdminUserRequest {
  userId: string
}

export interface GetAdminUsersRequest {
  active: boolean
}

export interface LoginRequest {
  data: LoginRequestDto
}

export interface SignupRequest {
  data: JoinRequestDto
}

export interface CheckUserIdRequest {
  userId: string
}

export interface CheckStudentNumberRequest {
  studentNumber: number
}

export interface BoardPagingRequest {
  activityId: number
  page: number
  size?: number
}

export interface BoardDetailRequest {
  activityId: number
  boardId: number
}

export interface DeleteBoardRequest {
  activityId: number
  boardId: number
}

export interface AddBoardRequest {
  activityId: number
  data: RegisterBoardPayload
}

export interface NoticePostPagingRequest {
  page: number
  size?: number
}

export interface DeleteNoticePostRequest {
  postId: number
}

export interface AddNoticePostRequest {
  data: CreatePostRequestDto
}

export interface ActivityPostPagingRequest {
  boardId: number
  page: number
  size?: number
}

export interface DeleteActivityPostRequest {
  boardId: number
  postId: number
}

export interface AddActivityPostRequest {
  boardId: number
  data: CreatePostRequestDto
}

export interface GetPostDetailRequest {
  postId: number
}

export interface GetSemesterRequest {
  semesterId: number
}

export interface GetUserRequest {
  userId: string
}
