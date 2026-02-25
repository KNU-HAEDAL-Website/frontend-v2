import { useEffect, useMemo, useState } from 'react'

import { getDateDistance } from '@toss/date'

export const CountdownTimer = () => {
  const endDate = useMemo(() => new Date('2026-03-04T23:59:59+09:00'), [])
  const [distance, setDistance] = useState(getDateDistance(new Date(), endDate))

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(getDateDistance(new Date(), endDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="relative z-20 flex justify-center py-16">
      <div
        className="relative flex w-[85%] max-w-[900px] flex-col items-center gap-6 rounded-[50%] px-6 py-12 sm:py-16"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(30,41,59,0.8) 0%, rgba(15,23,42,0.6) 60%, transparent 100%)',
          boxShadow:
            'inset 0 10px 40px rgba(0,0,0,0.6), 0 0 60px rgba(148,163,184,0.1)',
        }}
      >
        {/* Label */}
        <div className="rounded-full border border-slate-400/30 bg-slate-800/60 px-6 py-2 text-sm font-bold tracking-wider text-slate-300 backdrop-blur-sm sm:text-base">
          🌙 서류 마감까지
        </div>

        {/* Timer digits */}
        <div className="flex items-baseline gap-1 font-archivo sm:gap-2">
          {[
            { value: distance.days, label: 'DAYS' },
            { value: distance.hours, label: 'HRS' },
            { value: distance.minutes, label: 'MIN' },
            { value: distance.seconds, label: 'SEC' },
          ].map(({ value, label }, i) => (
            <div key={label} className="flex items-baseline">
              {i > 0 && (
                <span className="mx-1 text-2xl text-slate-600 sm:mx-2 sm:text-4xl">
                  :
                </span>
              )}
              <div className="flex flex-col items-center">
                <span
                  className="text-4xl font-black tracking-wider sm:text-5xl md:text-6xl lg:text-7xl"
                  style={{
                    background:
                      'linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 12px rgba(148,163,184,0.4))',
                  }}
                >
                  {padZero(value)}
                </span>
                <span className="text-[10px] tracking-[0.2em] text-slate-500 sm:text-xs">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const padZero = (num: number) => String(num).padStart(2, '0')
