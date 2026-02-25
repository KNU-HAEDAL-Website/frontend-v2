import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { DescriptionCard } from '@/components/feature'
import { Button, Card } from '@/components/ui'

import { TrackDescriptionCard } from './description-card'

export const RecruitTrack = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768)
  const visibleTracks = isExpanded ? TRACK_LIST : TRACK_LIST.slice(0, 3)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const handler = (e: MediaQueryListEvent) => setIsExpanded(e.matches)
    mq.addEventListener('change', handler)
    setIsExpanded(mq.matches)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return (
    <div className="relative flex flex-col items-center overflow-hidden py-32 lg:py-48">
      <div className="pointer-events-none absolute right-[-10%] top-[30%] sm:right-[-5%]">
        <div className="h-[500px] w-[500px] rounded-full bg-teal-600/15 blur-[100px] sm:h-[700px] sm:w-[700px]" />
      </div>

      <div className="animate-float-16s pointer-events-none absolute right-[-5%] top-[35%] sm:right-0">
        <div
          className="animate-spin-slow-70s relative h-[300px] w-[300px] overflow-hidden rounded-full sm:h-[450px] sm:w-[450px]"
          style={{
            background:
              'radial-gradient(circle at 40% 35%, #5eead4 0%, #0d9488 25%, #115e59 50%, #134e4a 70%, #042f2e 100%)',
            boxShadow:
              '0 0 80px 20px rgba(20,184,166,0.25), inset -50px -30px 70px rgba(0,0,0,0.6)',
          }}
        >
          <div className="absolute left-[-10%] top-[35%] h-2 w-[120%] rounded-full bg-teal-300/30" />
          <div className="absolute left-[-10%] top-[50%] h-3 w-[120%] rounded-full bg-emerald-400/20" />
          <div className="absolute left-[-10%] top-[65%] h-2 w-[120%] rounded-full bg-cyan-300/15" />
          <div className="absolute left-[50%] top-[28%] h-6 w-9 rounded-full bg-teal-200/25 blur-[1px]" />
          <div className="absolute left-[30%] top-[55%] h-4 w-6 rounded-full bg-emerald-300/20 blur-[1px]" />
          <div className="absolute left-[65%] top-[40%] h-3 w-4 rounded-full bg-cyan-200/20" />
        </div>
      </div>

      <div className="animate-float-16s pointer-events-none absolute inset-0">
        <div
          className="absolute right-[-15%] top-[43%] h-[100px] w-[600px] -rotate-12 rounded-[50%] sm:right-[-10%] sm:h-[140px] sm:w-[900px]"
          style={{
            border: '3px solid rgba(94,234,212,0.2)',
            boxShadow: '0 0 30px rgba(94,234,212,0.1)',
          }}
        />
        <div
          className="absolute right-[-15%] top-[43%] h-[130px] w-[650px] -rotate-12 rounded-[50%] sm:right-[-10%] sm:h-[180px] sm:w-[950px]"
          style={{
            border: '6px solid rgba(94,234,212,0.08)',
            filter: 'blur(3px)',
          }}
        />
      </div>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 mb-12 text-center"
      >
        <h2
          className="text-4xl font-black lg:text-6xl"
          style={{
            background: 'linear-gradient(90deg, #5eead4, #818cf8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 0 20px rgba(94,234,212,0.4))',
          }}
        >
          트랙 & 소모임
        </h2>
      </motion.div>

      {/* ── Descriptions ── */}
      <div className="relative z-10 flex flex-col gap-4 px-5">
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <DescriptionCard
            title="트랙이란?"
            description="같은 관심사를 가진 사람들이 모여 진행하는 학술 스터디로, 학기 당 2회의 활동 보고를 진행합니다. "
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <DescriptionCard
            title="소모임이란?"
            description="해달 회원이면 누구나 참여할 수 있는 모임으로, 학술 이외의 주제(취미, 친목 등)를 공유하며 자유롭게 네트워킹할 수 있습니다."
          />
        </motion.div>
      </div>

      {/* ── Track list ── */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative z-10 w-full px-6 py-10"
      >
        <Card className="mx-auto w-full max-w-[1024px] overflow-hidden border border-teal-400/10 bg-black/40 pb-6 pt-10 shadow-[0_0_60px_rgba(20,184,166,0.1)] backdrop-blur-xl">
          <div className="pb-4 text-center text-2xl font-bold tracking-wide text-white sm:text-3xl md:pb-6">
            현재 개설된 트랙 LIST
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 p-4 md:grid-cols-2">
            {visibleTracks.map(({ title, description, tags }) => (
              <TrackDescriptionCard
                title={title}
                description={description}
                tags={tags}
                key={title}
              />
            ))}
          </div>
          {!isExpanded && (
            <div className="pt-4 text-center md:hidden">
              <Button
                variant="outline"
                className="rounded-full border-teal-400/20 bg-teal-900/20 font-semibold text-teal-200 hover:bg-teal-800/30 hover:text-white"
                onClick={() => setIsExpanded(true)}
              >
                더보기
              </Button>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  )
}

type TrackList = {
  title: string
  tags: string[]
  description: string
}

const TRACK_LIST: TrackList[] = [
  {
    title: 'CORE',
    tags: ['#임베디드'],
    description:
      '라즈베리파이 피코를 활용하여 다양한 프로젝트를 수행하는 것을 목표로 하며, 프로젝트 경험과 함께 성장할 수 있는 기회를 잡을 수 있습니다.',
  },
  {
    title: 'DATTO',
    tags: ['#AI', '#데이터분석'],
    description:
      '개인별 학습 목표 설정과 달성을 위한 지속적인 자율 공부를 독려하며, 그룹 활동을 통해 인사이트를 공유하고 성장할 수 있습니다.',
  },
  {
    title: '코테해',
    tags: ['#알고리즘'],
    description:
      '알고리즘 입문 및 코딩 테스트 준비를 위한 트랙입니다. 강의를 함께 완강하며 문제 풀이와 스터디를 통해 체계적으로 코딩 테스트를 대비할 수 있습니다.',
  },
  {
    title: 'MOAI',
    tags: ['#온디바이스AI', '#AI'],
    description:
      '온디바이스 AI 환경 구축 및 실습을 목표로 하는 스터디 트랙이며, 최신 하드웨어 환경과 소형 모델의 작동 원리를 배우고 경량화 모델을 만들어봅니다.',
  },
]
