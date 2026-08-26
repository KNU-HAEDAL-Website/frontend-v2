export interface ScheduleDate {
  year: number
  month: number
  day: number
}

export interface ScheduleEvent extends ScheduleDate {
  id: string
  title: string
  time?: string
  end?: ScheduleDate
}

export const scheduleEvents: ScheduleEvent[] = [
  {
    id: 'join-1',
    title: '서류접수',
    year: 2026,
    month: 8,
    day: 27,
    end: {
      year: 2026,
      month: 9,
      day: 3,
    },
  },
  {
    id: 'join-3',
    title: '서류결과발표',
    year: 2026,
    month: 9,
    day: 4,
  },
  {
    id: 'join-4',
    title: '오프라인면접',
    year: 2026,
    month: 9,
    day: 5,
    end: {
      year: 2026,
      month: 9,
      day: 8,
    },
  },
  {
    id: 'join-6',
    title: '최종발표',
    year: 2026,
    month: 9,
    day: 10,
  },
  {
    id: 'join-7',
    title: '신규부원OT',
    year: 2026,
    month: 9,
    day: 11,
  },
]
