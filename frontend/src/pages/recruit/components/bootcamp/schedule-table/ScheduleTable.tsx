import { cn } from '@/lib/utils'

export const BootcampScheduleTable = () => {
  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_0_30px_rgba(255,255,255,0.05)] backdrop-blur-md">
        <table className="w-full max-w-[1000px] table-fixed text-center text-slate-200">
          <thead className="bg-white/5 text-white">
            <tr>
              <th className="border-b border-r border-white/10 p-3" />
              {DAYS.map((day) => (
                <th
                  key={day}
                  className="border-b border-r border-white/10 px-1 py-2 text-xs font-medium tracking-wide text-blue-200 last:border-r-0 sm:px-4 sm:py-3 sm:text-base sm:tracking-widest"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {CLASS_SCHEDULE.map((group, index) => (
              <tr
                key={index}
                className={cn(
                  'transition-colors hover:bg-white/5',
                  index === 0 ? 'bg-blue-900/10' : 'bg-purple-900/10',
                )}
              >
                <td className="whitespace-nowrap border-r border-white/10 px-1 py-3 text-xs font-semibold tracking-tight sm:px-3 sm:py-4 sm:text-base sm:tracking-wider">
                  <span
                    className={
                      index === 0 ? 'text-blue-300' : 'text-purple-300'
                    }
                  >
                    {group.level}
                  </span>
                </td>
                {DAYS.map((day, dayIndex) => (
                  <td
                    key={day}
                    className={cn(
                      'border-r border-white/10 align-top text-[10px] font-light leading-tight tracking-tighter sm:whitespace-nowrap sm:text-sm sm:tracking-normal md:text-base',
                      dayIndex === DAYS.length - 1 && 'border-r-0',
                    )}
                  >
                    {group.schedule[day].map((subject, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex min-h-[40px] items-center justify-center break-keep px-1 py-2 text-center sm:min-h-[50px] sm:px-2 sm:py-3',
                          idx < group.schedule[day].length - 1 &&
                            'border-b border-white/5',
                          subject !== '' && 'font-medium text-slate-100',
                        )}
                      >
                        {subject === '' ? (
                          <span className="opacity-0">-</span>
                        ) : (
                          subject
                        )}
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

type Day = (typeof DAYS)[number]

const DAYS = ['월', '화', '수', '목', '금'] as const

type ClassSchedule = {
  level: string
  schedule: Record<Day, string[]>
}

const CLASS_SCHEDULE: ClassSchedule[] = [
  {
    level: '기초반',
    schedule: {
      월: ['', '', ''],
      화: ['C', '', ''],
      수: ['', 'Python', '웹 기초'],
      목: ['C', '', ''],
      금: ['', 'Python', '웹 기초'],
    },
  },
  {
    level: '심화반',
    schedule: {
      월: ['', 'Flutter', '머신러닝'],
      화: ['Spring', '', ''],
      수: ['', 'Flutter', ''],
      목: ['Spring', '', ''],
      금: ['', '', '머신러닝'],
    },
  },
] as const
