// Author : Kimseonghyeon
// Description : Stats.tsx에서 사용할 정보를 적어놓은 파일.
// NOTICE : 제대로 작동하는지 볼려고 잠깐 넣어놓은 파일.
//          폴더 구조상 data가 여기에 있으면 안됨
//          나중에 옮기겠음

export interface ClubStat {
  readonly id: string
  readonly label: string
  readonly value: number
  readonly unit: string
  readonly description: string
  readonly accent: boolean
}

export const clubStats = [
  {
    id: 'members',
    label: '동아리원 수',
    value: 45,
    unit: '명',
    description: '현재 해달과 함께하고 있는 사람들',
    accent: true,
  },
  {
    id: 'club-room',
    label: '동아리 방',
    value: 109,
    unit: '호',
    description: '함께 공부하고 프로젝트를 만드는 공간',
    accent: true,
  },
  {
    id: 'hackathon',
    label: '해커톤에서 만들어진 작품 수',
    value: 110,
    unit: '개',
    description: '해커톤',
    accent: true,
  },
  {
    id: 'startat',
    label: '시작년도',
    value: 2026,
    unit: '년',
    description: '시작년도',
    accent: true,
  },
  {
    id: 'bootcamp',
    label: '개설된 부트캠프 수',
    value: 7,
    unit: '개',
    description: '부캠',
    accent: true,
  },
  {
    id: 'server',
    label: '보유한 서버 컴퓨터 수',
    value: 3,
    unit: '대',
    description: '컴퓨터',
    accent: true,
  },
  {
    id: 'arduino',
    label: '보유한 아두이노 수',
    value: 10,
    unit: '개',
    description: '아두이노',
    accent: true,
  },
] as const satisfies readonly ClubStat[]
