// Author : Kimseonghyeon
// Description : Stats.tsx에서 사용할 정보를 적어놓은 파일.
// NOTICE : 제대로 작동하는지 볼려고 잠깐 넣어놓은 파일.
//          폴더 구조상 data가 여기에 있으면 안됨
//          나중에 옮기겠음

export interface ClubStat {
  readonly id: string
  readonly label: string
  readonly value: string
  readonly unit: string
  readonly description: string
  readonly accent: boolean
}

export const clubStats = [
  {
    id: 'members',
    label: '26-1 기준 동아리원',
    value: '130',
    unit: '명',
    description: '현재 해달과 함께하고 있는 사람들',
    accent: true,
  },
  {
    id: 'club-room',
    label: 'IT2호관 동아리 방',
    value: '109',
    unit: '호',
    description: '함께 공부하고 프로젝트를 만드는 공간',
    accent: true,
  },
  {
    id: 'bootcamp',
    label: '개설 부트캠프/트랙',
    value: '7',
    unit: '개',
    description: '부캠',
    accent: true,
  },
  {
    id: 'server',
    label: '보유 서버 컴퓨터',
    value: '3',
    unit: '대',
    description: '컴퓨터',
    accent: true,
  },
  {
    id: 'arduino',
    label: '보유 아두이노/라즈베리파이',
    value: '10',
    unit: '개',
    description: '아두이노',
    accent: true,
  },
  {
    id: 'books',
    label: '보유 서적',
    value: '100',
    unit: '+권',
    description: '책',
    accent: true,
  },
] as const satisfies readonly ClubStat[]
