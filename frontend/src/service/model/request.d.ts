import { Paging, Role } from '@/types'

import {
  CommentResponseDto,
  ProfileResponseDto,
  UpdateProfileImagePayload,
} from './data-contracts'

export type GetActivitiesRequest = {
  semesterId: number
}

export type GetActivityDetailRequest = {
  semesterId: number
  activityId: number
}

export type AddActivityRequest = {
  semesterId: number
  data: CreateActivityRequestDto
}

export type DeleteActivityRequest = {
  semesterId: number
  activityId: number
}

export type AddSemesterRequest = {
  semesterName: string
}

export type DeleteSemesterRequest = {
  semesterId: number
}

export type AdminUserRequest = {
  userId: string
}

export type ChangeRoleRequest = {
  userId: string
  data: UpdateRoleRequestDto
}

export type GetAdminUsersRequest = {
  active: boolean
}

export interface LoginRequest {
  data: LoginRequestDto
}

export interface SignupRequest {
  data: JoinRequestDto
}

export interface CheckStudentNumberRequest {
  studentNumber: number
}

export interface CheckUserIdRequest {
  userId: string
}

export type AddBoardRequest = {
  activityId: number
  data: RegisterBoardPayload
}

export type UpdateBoardRequest = {
  activityId: number
  boardId: number
  data: BoardRequestDto
}

export type UpdateBoardImageRequest = {
  activityId: number
  boardId: number
  data: UpdateBoardImagePayload
}

export type BoardDetailRequest = {
  activityId: number
  boardId: number
}

export type BoardPagingRequest = {
  activityId: number
  page: number
  size?: number
}

export type DeleteBoardRequest = {
  activityId: number
  boardId: number
}

export type BoardPagingResponse = {
  boards: BoardResponseDto[]
} & Paging

export type GetUserInfoRequest = {
  userId: string
}

export type GetProfilePagingRequest = {
  page?: string
  size?: number
  roles: Role[]
  joinSemester?: string
}

export type ProfilePagingProps = {
  initPageToken?: string
} & GetProfilePagingRequest

export type ProfilePagingResponse = {
  profiles: ProfileResponseDto[]
} & Paging

export type GetUserProfileRequest = {
  userId: string
}

export type UpdateProfileImageRequest = {
  userId: string
  data: UpdateProfileImagePayload
}

export type DeleteProfileImageRequest = {
  userId: string
}

export type UpdateProfileRequest = {
  userId: string
  data: ProfileRequestDto
}

export type ActivityPostPagingRequest = {
  boardId: number
  page: number
  size?: number
}

export type AddActivityPostRequest = {
  boardId: number
  data: PostWithBoardRequestDto
}

export type DeleteActivityPostRequest = {
  boardId: number
  postId: number
}

export type UpdateActivityPostRequest = {
  boardId: number
  postId: number
  data: PostWithBoardRequestDto
}

export type GetActivityPostDetailRequest = {
  boardId: number
  postId: number
}

type PostPagingResponse = {
  posts: PostWithBoardSummaryResponseDto[]
} & Paging

export type UploadPostImageRequest = {
  data: RegisterPostImagePayload
}

export type AddNoticePostRequest = {
  data: BasePostRequestDto
}

export type DeleteNoticePostRequest = {
  postId: number
}

export type UpdateNoticePostRequest = {
  postId: number
  data: BasePostRequestDto
}

export type GetNoticePostDetailRequest = {
  postId: number
}

export type NoticePostPagingRequest = {
  page: number
  size?: number
}

type NoticePostPagingResponse = {
  posts: BasePostSummaryResponseDto[]
} & Paging

export type GetSemesterRequest = {
  semesterId: number
}

export type GetUserRequest = {
  userId: string
}

export type CommentPagingRequest = {
  postId: number
  page: number
  size?: number
}

export type CommentPagingResponse = {
  comments: CommentResponseDto[]
} & Paging

export type AddCommentRequest = {
  postId: number
  data: CommentRequestDto
}

export type AddCommentReplyRequest = {
  commentId: number
  data: CommentRequestDto
}

export type DeleteCommentRequest = {
  postId: number
  commentId: number
}

export type UpdateCommentRequest = {
  postId: number
  commentId: number
  data: CommentRequestDto
}

export type GetUserIdRequest = {
  studentNumber: number
  name: string
}

export type ResetPasswordRequest = {
  userId: string
  studentNumber: number
}

export type VerifyResetPasswordCodeRequest = {
  userId: string
  code: string
}
