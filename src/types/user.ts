export type User = {
  userId: string
  studentNumber: number
  userName: string
}

export type Role =
  | 'ROLE_WEB_MASTER'
  | 'ROLE_ADMIN'
  | 'ROLE_TEAM_LEADER'
  | 'ROLE_MEMBER'
