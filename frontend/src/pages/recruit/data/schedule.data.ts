export type ScheduleCategory =
  | 'bootcamp'
  | 'track'
  | 'project'
  | 'event'
  | 'etc'

export interface ScheduleEvent {
  id: string
  title: string

  year: number
  month: number
  day: number

  time?: string
  endDate?: string

  category: ScheduleCategory
}

export interface ScheduleCategoryInfo {
  id: ScheduleCategory
  label: string
}

export const scheduleCategories: ScheduleCategoryInfo[] = [
  {
    id: 'bootcamp',
    label: '부트캠프',
  },
  {
    id: 'track',
    label: '트랙',
  },
  {
    id: 'project',
    label: '프로젝트',
  },
  {
    id: 'event',
    label: '해커톤 / 행사',
  },
  {
    id: 'etc',
    label: '기타',
  },
]

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: 'data-track-0903',
    title: '데이터연구회',
    year: 2026,
    month: 9,
    day: 3,
    time: '19:00',
    category: 'track',
  },

  {
    id: 'c-bootcamp-0905',
    title: 'C 부트캠프 OT',
    year: 2026,
    month: 9,
    day: 5,
    time: '17:00',
    category: 'bootcamp',
  },

  {
    id: 'sql-track-0909',
    title: 'SQL연구회',
    year: 2026,
    month: 9,
    day: 9,
    time: '19:00',
    category: 'track',
  },

  {
    id: 'embedded-track-0911',
    title: '임베디드',
    year: 2026,
    month: 9,
    day: 11,
    time: '18:00',
    category: 'track',
  },

  {
    id: 'frontend-bootcamp-0912',
    title: 'Web Frontend 부트캠프',
    year: 2026,
    month: 9,
    day: 12,
    time: '17:00',
    category: 'bootcamp',
  },

  {
    id: 'data-track-0916',
    title: '데이터연구회',
    year: 2026,
    month: 9,
    day: 16,
    time: '19:00',
    category: 'track',
  },

  {
    id: 'haedal-hackathon',
    title: '해달 해커톤 아이디어 접수',
    year: 2026,
    month: 9,
    day: 18,
    endDate: '~ 9.20',
    category: 'event',
  },

  {
    id: 'sql-track-0923',
    title: 'SQL연구회',
    year: 2026,
    month: 9,
    day: 23,
    time: '19:00',
    category: 'track',
  },

  {
    id: 'data-track-0924',
    title: '데이터연구회',
    year: 2026,
    month: 9,
    day: 24,
    time: '19:00',
    category: 'track',
  },

  {
    id: 'flutter-bootcamp-0926',
    title: '플러터 부트캠프',
    year: 2026,
    month: 9,
    day: 26,
    time: '17:00',
    category: 'bootcamp',
  },

  {
    id: 'embedded-track-0930',
    title: '임베디드',
    year: 2026,
    month: 9,
    day: 30,
    time: '18:00',
    category: 'track',
  },

  {
    id: 'project-presentation-1004',
    title: '프로젝트 발표',
    year: 2026,
    month: 10,
    day: 4,
    time: '10:00',
    category: 'project',
  },
]
