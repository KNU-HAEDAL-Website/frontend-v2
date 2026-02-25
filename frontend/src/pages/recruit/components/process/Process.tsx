import { motion } from 'framer-motion'

import { ProcessCard } from './card'

export const RecruitProcess = () => {
  return (
    <div className="relative flex flex-col items-center gap-12 pb-20 pt-32 lg:pt-48">
      <div className="pointer-events-none absolute left-1/2 top-[-20%] -translate-x-1/2">
        <div className="animate-pulse-10s h-[800px] w-[800px] rounded-full bg-orange-500/20 blur-[150px] sm:h-[1200px] sm:w-[1200px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[-12%] -translate-x-1/2">
        <div className="animate-pulse-4s h-[600px] w-[600px] rounded-full bg-yellow-400/25 blur-[80px] sm:h-[900px] sm:w-[900px]" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-[-5%] -translate-x-1/2">
        <div
          className="animate-spin-slow-90s relative h-[500px] w-[500px] overflow-hidden rounded-full sm:h-[700px] sm:w-[700px]"
          style={{
            background:
              'radial-gradient(circle at 45% 40%, #fff7ed 0%, #fde68a 15%, #fbbf24 30%, #f97316 50%, #ea580c 70%, #9a3412 100%)',
            boxShadow:
              '0 0 150px 60px rgba(251,146,60,0.4), 0 0 300px 100px rgba(234,88,12,0.2), inset -40px 20px 60px rgba(255,255,255,0.15)',
          }}
        >
          <div className="absolute left-[45%] top-[30%] h-8 w-10 rounded-full bg-orange-800/50 blur-[1px] sm:h-12 sm:w-14" />
          <div className="absolute left-[30%] top-[50%] h-5 w-7 rounded-full bg-red-800/40 blur-[1px] sm:h-8 sm:w-10" />
          <div className="absolute left-[60%] top-[40%] h-4 w-5 rounded-full bg-orange-900/35 sm:h-6 sm:w-7" />
          <div className="absolute left-[50%] top-[65%] h-3 w-4 rounded-full bg-red-900/30 sm:h-5 sm:w-6" />

          <div className="absolute left-[-10%] top-[25%] h-2 w-[120%] rounded-full bg-yellow-300/15" />
          <div className="absolute left-[-10%] top-[45%] h-3 w-[120%] rounded-full bg-orange-400/10" />
          <div className="bg-amber-300/12 absolute left-[-10%] top-[60%] h-2 w-[120%] rounded-full" />

          <div className="absolute left-[35%] top-[35%] h-4 w-8 rounded-full bg-yellow-100/30 blur-[2px]" />
          <div className="absolute left-[55%] top-[55%] h-3 w-6 rounded-full bg-amber-100/25 blur-[1px]" />
        </div>
      </div>

      <div className="animate-float-sm pointer-events-none absolute inset-0">
        <div className="absolute left-[35%] top-[5%] h-40 w-4 rotate-[20deg] rounded-full bg-yellow-400/30 blur-md" />
        <div className="absolute left-[60%] top-[8%] h-32 w-3 rotate-[-15deg] rounded-full bg-orange-400/25 blur-md" />
        <div className="absolute left-[45%] top-[15%] h-24 w-3 rotate-[5deg] rounded-full bg-amber-300/20 blur-sm" />
      </div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 mb-8 flex flex-col items-center gap-3 text-center font-extrabold"
      >
        <div className="text-lg font-bold tracking-widest text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] sm:text-2xl">
          해달을 찾아 떠나는
        </div>
        <div
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fef08a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter:
              'drop-shadow(0 4px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 30px rgba(0,0,0,0.8))',
          }}
        >
          위대한 우주 비행
        </div>
        <div className="mt-2 text-xl font-bold tracking-wide text-amber-100 drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] sm:text-3xl">
          현재 준회원 모집중
        </div>
      </motion.div>

      {/* ── Timeline cards ── */}
      <div className="relative z-10 flex w-full justify-center px-5 sm:px-10">
        <div className="flex flex-wrap justify-center gap-4 pb-6">
          {RECRUIT_PROCESS.map(({ title, detail }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProcessCard title={title} detail={detail} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-20 mt-4 text-sm text-amber-400/60"
      >
        ↓ 스크롤하여 달을 향해 출발하세요 ↓
      </motion.p>
    </div>
  )
}

const RECRUIT_PROCESS = [
  { title: '서류접수', detail: '02.25.(수) ~ 03.04.(수)' },
  { title: '서류 발표', detail: '03.05.(목)' },
  { title: '오프라인 면접', detail: '03.06.(금) ~ 03.09.(월)' },
  { title: '최종 발표', detail: '03.11.(수) ~ 03.12.(목)' },
  { title: '신규 부원 OT', detail: '03.13.(금)' },
]
