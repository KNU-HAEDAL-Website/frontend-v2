import { motion } from 'framer-motion'

import { DescriptionCard } from './description-card'

export const RecruitEvent = () => {
  return (
    <div className="relative flex flex-col items-center py-32 lg:py-48">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[100px] sm:h-[700px] sm:w-[700px]" />
      </div>

      <div className="animate-float-12s pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="animate-spin-slow-60s relative h-[350px] w-[350px] overflow-hidden rounded-full sm:h-[500px] sm:w-[500px]"
          style={{
            background:
              'radial-gradient(circle at 35% 30%, #818cf8 0%, #4338ca 25%, #312e81 50%, #1e1b4b 80%, #0c0a2a 100%)',
            boxShadow:
              '0 0 80px 20px rgba(99,102,241,0.3), inset -40px -30px 80px rgba(0,0,0,0.7)',
          }}
        >
          <div className="absolute left-[-10%] top-[30%] h-3 w-[120%] rounded-full bg-purple-400/30 blur-[1px]" />
          <div className="absolute left-[-10%] top-[42%] h-4 w-[120%] rounded-full bg-indigo-300/25" />
          <div className="absolute left-[-10%] top-[55%] h-2 w-[120%] rounded-full bg-blue-400/20 blur-[1px]" />
          <div className="absolute left-[-10%] top-[65%] h-3 w-[120%] rounded-full bg-purple-500/15" />
          <div className="absolute left-[55%] top-[38%] h-8 w-12 rounded-full bg-purple-300/40 blur-[2px] sm:h-12 sm:w-16" />
          <div className="absolute left-[25%] top-[50%] h-5 w-8 rounded-full bg-indigo-200/25 blur-[1px] sm:h-7 sm:w-10" />
          <div className="absolute left-[40%] top-[20%] h-4 w-6 rounded-full bg-violet-300/20 blur-[1px]" />
          <div className="absolute left-[60%] top-[70%] h-3 w-5 rounded-full bg-blue-300/15 blur-[1px]" />
        </div>
      </div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-16 text-center"
      >
        <h2
          className="text-4xl font-black lg:text-6xl"
          style={{
            background: 'linear-gradient(90deg, #93c5fd, #a78bfa, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(167,139,250,0.5))',
          }}
        >
          주요 행사
        </h2>
      </motion.div>

      {/* ── Cards grid ── */}
      <div className="relative z-10 grid w-full max-w-screen-lg grid-cols-2 gap-4 px-5 sm:grid-cols-3 sm:px-10 md:gap-6 md:px-20 lg:px-28">
        {EVENTS_DETAIL.map(({ id, title, description, accentColor }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <DescriptionCard
              title={title}
              description={description}
              accentColor={accentColor}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const EVENTS_DETAIL = [
  {
    id: 0,
    title: '개강 총회\n& 종강 총회',
    description: '해달 구성원들의 만남, 네트워킹으로 시작되는 해달의 묘미',
    accentColor: '#c084fc',
  },
  {
    id: 1,
    title: '해크닉\n& MT',
    description:
      '준회원들의 시간인 해크닉과, 모두가 함께 즐기는 MT도 준비 완료',
    accentColor: '#818cf8',
  },
  {
    id: 2,
    title: '아이디어톤\n& 해커톤',
    description:
      '우리의 멋있는 아이디어를 빌드업하고 제대로 구현해볼 수 있는 기회',
    accentColor: '#67e8f9',
  },
  {
    id: 3,
    title: '슬기로운\n 해달생활',
    description:
      '해달에서 지켜주는 맛있는 시험기간입니다. 공부 인증형 간식 마차',
    accentColor: '#93c5fd',
  },
  {
    id: 4,
    title: '진로 특강 \n& 취업 특강',
    description: '학기마다 열리는 진로를 탐색 및 취업 시장 파악의 기회',
    accentColor: '#a5b4fc',
  },
  {
    id: 5,
    title: '성과 공유회',
    description: '한 학기 동안의 활동을 공유하는 회고의 시간',
    accentColor: '#e9d5ff',
  },
]
