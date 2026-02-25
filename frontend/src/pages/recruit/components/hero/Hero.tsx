import { useEffect, useMemo, useState } from 'react'

import { getDateDistance } from '@toss/date'
import { AnimatePresence, motion } from 'framer-motion'

export const RecruitHero = () => {
  const endDate = useMemo(() => new Date('2026-03-04T23:59:59+09:00'), [])
  const [distance, setDistance] = useState(getDateDistance(new Date(), endDate))

  const [moonClicks, setMoonClicks] = useState(0)
  const [showRabbit, setShowRabbit] = useState(false)

  const handleMoonClick = () => {
    if (showRabbit) return
    const newClicks = moonClicks + 1
    if (newClicks >= 10) {
      setShowRabbit(true)
      setMoonClicks(0)
      setTimeout(() => setShowRabbit(false), 4000)
    } else {
      setMoonClicks(newClicks)
    }
  }

  useEffect(() => {
    const t = setInterval(
      () => setDistance(getDateDistance(new Date(), endDate)),
      1000,
    )
    return () => clearInterval(t)
  }, [endDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div className="relative flex flex-col items-center pb-20 pt-32 lg:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-[-15%] -translate-x-1/2">
        <div className="bg-slate-300/8 h-[600px] w-[600px] rounded-full blur-[100px] sm:h-[900px] sm:w-[900px] md:h-[1100px] md:w-[1100px]" />
      </div>

      <div className="animate-float-15s pointer-events-none absolute left-1/2 top-[-8%] z-10 -translate-x-1/2">
        <div
          onClick={handleMoonClick}
          className="animate-spin-slow-120s pointer-events-auto relative h-[500px] w-[500px] cursor-pointer overflow-hidden rounded-full sm:h-[750px] sm:w-[750px] md:h-[950px] md:w-[950px]"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #e2e8f0 0%, #94a3b8 25%, #64748b 50%, #334155 85%, #1e293b 100%)',
            boxShadow:
              '0 0 150px 50px rgba(148,163,184,0.2), inset -80px -50px 120px rgba(0,0,0,0.5)',
          }}
        >
          <div className="absolute left-[30%] top-[15%] h-16 w-16 rounded-full bg-slate-600/40 shadow-[inset_2px_2px_8px_rgba(0,0,0,0.4)] sm:h-24 sm:w-24" />
          <div className="absolute left-[60%] top-[30%] h-10 w-10 rounded-full bg-slate-500/30 shadow-[inset_1px_1px_5px_rgba(0,0,0,0.3)] sm:h-14 sm:w-14" />
          <div className="absolute left-[40%] top-[50%] h-8 w-8 rounded-full bg-slate-700/35 shadow-[inset_1px_1px_4px_rgba(0,0,0,0.3)] sm:h-12 sm:w-12" />
          <div className="absolute left-[55%] top-[65%] h-6 w-6 rounded-full bg-slate-500/25 sm:h-8 sm:w-8" />
          <div className="absolute left-[45%] top-[25%] h-5 w-5 rounded-full bg-slate-600/20 sm:h-7 sm:w-7" />
          <div className="absolute left-[25%] top-[42%] h-4 w-4 rounded-full bg-slate-500/20 sm:h-6 sm:w-6" />
          <div className="absolute left-[35%] top-[70%] h-12 w-12 rounded-full bg-slate-600/30 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.3)] sm:h-16 sm:w-16" />
          <div className="absolute left-[15%] top-[20%] h-20 w-28 rounded-[60%] bg-slate-700/20 blur-[2px] sm:h-28 sm:w-40" />
          <div className="absolute left-[50%] top-[45%] h-16 w-24 rounded-[60%] bg-slate-600/15 blur-[2px] sm:h-24 sm:w-32" />
        </div>
      </div>

      <AnimatePresence>
        {showRabbit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.5, y: -100 }}
            transition={{
              duration: 0.5,
            }}
            className="pointer-events-none absolute right-[5%] top-[-5%] z-50 flex items-end drop-shadow-[0_0_20px_rgba(255,255,255,0.6)] sm:right-[15%] sm:top-[2%]"
          >
            <div className="relative h-64 w-64">
              {/* === Mortar (절구) === */}
              <div className="absolute bottom-4 left-4 h-20 w-28 rounded-b-3xl border-b-4 border-amber-900 bg-amber-800 shadow-lg">
                <div className="absolute -top-3 left-0 h-8 w-28 rounded-[50%] border-4 border-amber-800 bg-amber-700 shadow-inner" />
              </div>

              {/* === Mochi (떡) === */}
              <motion.div
                animate={{
                  scaleY: [1, 0.4, 1],
                  scaleX: [1, 1.3, 1],
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-20 left-10 h-8 w-16 rounded-[50%] bg-white shadow-[inset_0_-4px_10px_rgba(0,0,0,0.1)]"
              />

              {/* === Rabbit (토끼) === */}
              <div className="absolute bottom-4 right-4 h-28 w-24 rounded-t-[50px] rounded-bl-[40px] rounded-br-[20px] bg-white shadow-lg">
                {/* Tail */}
                <div className="absolute -right-4 bottom-2 h-10 w-10 rounded-full bg-gray-100 shadow-sm" />

                {/* Head */}
                <motion.div
                  animate={{ rotate: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -left-6 -top-10 h-16 w-20 origin-bottom-right rounded-[50%] bg-white shadow-sm"
                >
                  {/* Eye */}
                  <div className="absolute left-4 top-5 h-4 w-2 rounded-full bg-slate-800" />
                  {/* Blush */}
                  <div className="absolute left-8 top-8 h-3 w-5 rounded-full bg-pink-300 opacity-60 blur-[2px]" />

                  {/* Left Ear */}
                  <motion.div
                    animate={{ rotate: [-20, -35, -20] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute -top-16 left-2 h-20 w-6 origin-bottom rounded-[50%] border-4 border-pink-50/50 bg-white"
                  />
                  {/* Right Ear */}
                  <motion.div
                    animate={{ rotate: [10, -5, 10] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: 0.1,
                    }}
                    className="absolute -top-14 left-10 h-16 w-5 origin-bottom rounded-[50%] border-4 border-pink-50/50 bg-white"
                  />
                </motion.div>

                {/* Arm & Mallet Wrapper */}
                <motion.div
                  animate={{
                    rotate: [15, -60, 15],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute left-0 top-10 h-10 w-10 origin-top-right"
                >
                  {/* Arm - Attached right at the origin */}
                  <div className="absolute right-0 top-0 h-4 w-16 -rotate-12 rounded-full bg-white shadow-sm" />

                  {/* Mallet Handle - Held at the very end of the extended arm */}
                  <div className="absolute -left-16 -top-4 h-2 w-24 -rotate-[25deg] rounded-full bg-amber-700 shadow-sm" />

                  {/* Mallet Head */}
                  <div className="absolute -left-20 -top-12 h-16 w-10 -rotate-[25deg] rounded-lg border-b-4 border-amber-900 bg-amber-800 shadow-md" />
                </motion.div>

                {/* Leg */}
                <div className="absolute -left-4 bottom-2 h-6 w-12 rounded-full border-b-2 border-gray-200 bg-gray-50" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-20 mb-16 flex flex-col items-center gap-3 text-center font-extrabold"
      >
        <div className="text-lg tracking-widest text-slate-400/80 sm:text-xl">
          ✦ 달에 도착 ✦
        </div>
        <div
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            background:
              'linear-gradient(180deg, #ffffff 0%, #cbd5e1 50%, #818cf8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter:
              'drop-shadow(0 2px 8px rgba(0,0,0,0.8)) drop-shadow(0 0 30px rgba(99,102,241,0.6))',
          }}
        >
          해달에 합류하세요
        </div>
      </motion.div>

      {/* ── Countdown Timer ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-20 w-[90%] max-w-[700px]"
      >
        <div
          className="flex flex-col items-center gap-5 rounded-3xl px-6 py-8 sm:py-10"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(30,41,59,0.85) 0%, rgba(15,23,42,0.5) 70%, transparent 100%)',
            boxShadow:
              'inset 0 8px 32px rgba(0,0,0,0.5), 0 0 50px rgba(148,163,184,0.08)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="rounded-full border border-slate-400/30 bg-slate-800/60 px-5 py-1.5 text-xs font-bold tracking-widest text-slate-300 sm:text-sm">
            🌙 서류 마감까지
          </div>
          <div className="flex items-baseline gap-1 sm:gap-2">
            {[
              { v: distance.days, l: 'DAYS' },
              { v: distance.hours, l: 'HRS' },
              { v: distance.minutes, l: 'MIN' },
              { v: distance.seconds, l: 'SEC' },
            ].map(({ v, l }, i) => (
              <div key={l} className="flex items-baseline">
                {i > 0 && (
                  <span className="mx-1 text-xl text-slate-600 sm:mx-2 sm:text-3xl md:text-4xl">
                    :
                  </span>
                )}
                <div className="flex flex-col items-center">
                  <span
                    className="text-3xl font-black tracking-wider sm:text-4xl md:text-5xl lg:text-6xl"
                    style={{
                      background:
                        'linear-gradient(180deg, #e2e8f0 0%, #94a3b8 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 0 10px rgba(148,163,184,0.4))',
                    }}
                  >
                    {pad(v)}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-slate-500 sm:text-xs">
                    {l}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
