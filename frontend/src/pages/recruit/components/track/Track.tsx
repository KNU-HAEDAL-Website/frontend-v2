import { useEffect, useState } from 'react'

import { DescriptionCard } from '@/components/feature'
import { Button, Card } from '@/components/ui'

import { TrackDescriptionCard } from './description-card'

export const RecruitTrack = () => {
  const [isExpanded, setIsExpanded] = useState(window.innerWidth > 768)
  const visibleTracks = isExpanded ? TRACK_LIST : TRACK_LIST.slice(0, 3)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsExpanded(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)
    setIsExpanded(mediaQuery.matches)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  return (
    <div className="flex flex-col items-center bg-[#E9EDFF]">
      <div
        data-aos="fade-up"
        data-aos-duration="600"
        className="text-4xl font-bold lg:text-5xl"
      >
        트랙 & 소모임
      </div>
      <div className="flex flex-col gap-4 pt-10">
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay={100}>
          <DescriptionCard
            title="트랙이란?"
            description="해달 정회원이 참여 가능한 코스로, 학술 분야의 내용을 탐구하기 위해 만들어진 모임입니다."
          />
        </div>
        <div data-aos="fade-up" data-aos-duration="600" data-aos-delay={200}>
          <DescriptionCard
            title="소모임이란?"
            description="해달 회원이면 모두 참여할 수 있는 모임으로, 학술 이외의 주제를 공유하며 네트워킹할 수 있습니다."
          />
        </div>
        <div
          className="px-6 py-10"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay={250}
        >
          <Card className="w-full max-w-[1024px] border-none bg-[#BCB5C9] pb-6 pt-10 shadow-none">
            <div className="pb-4 text-center text-2xl font-semibold text-white sm:text-3xl md:pb-6">
              현재 개설된 트랙 LIST
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-3 p-4 md:grid-cols-2">
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
              <div className="text-center md:hidden">
                <Button
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => setIsExpanded(true)}
                >
                  더보기
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
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
    title: 'DATTO',
    tags: ['#AI', '#데이터분석'],
    description:
      '개인별 학습 목표 설정과 달성을 위한 지속적인 자율 공부를 독려하며, 그룹 활동을 통해 인사이트를 공유하고 성장할 수 있습니다.',
  },
  {
    title: '무제의 스프링',
    tags: ['#백엔드', '#스프링'],
    description:
      "'토비의 스프링'을 실습과 함께 같이 독서하는 스터디 입니다. 실습을 하며 직접 스프링 일부를 구현해보며 백엔드에 관한 지식을 습득하는 것을 목표로 하고 있습니다.",
  },
  {
    title: '코테해',
    tags: ['#알고리즘'],
    description:
      '알고리즘 입문 및 코딩 테스트 준비를 위한 트랙입니다. 강의를 함께 완강하며 문제 풀이와 스터디를 통해 체계적으로 코딩 테스트를 대비할 수 있습니다.',
  },
  {
    title: 'CORE',
    tags: ['#임베디드'],
    description:
      '라즈베리파이 피코를 활용하여 다양한 프로젝트를 수행하는 것을 목표로 하며, 프로젝트 경험과 함께 성장할 수 있는 기회를 잡을 수 있습니다.',
  },
  {
    title: 'AI 실전개발',
    tags: ['#AI'],
    description:
      'AI 서비스를 처음 만들어보는 사람들을 위한 스터디입니다. LangChain을 활용해 실무에 가까운 RAG 시스템을 직접 만들어보며 생성형 AI의 활용 방법을 경험해볼수 있습니다.',
  },
  {
    title: 'TEEMO',
    tags: ['#유니티', '#게임'],
    description:
      '해달의 유니티 게임 개발 트랙입니다. 주 1회 유니티 개발 스터디를 가지며, 게임잼 연습과 공모전 공동참여를 목적으로 진행합니다.',
  },
  {
    title: '해커s',
    tags: ['#보안', '#리눅스'],
    description:
      '정보보안의 기초 지식 및 기반을 학습하는 트랙입니다. 리눅스 기반 해킹을 목표로 리눅스 학습을 진행합니다.',
  },
]
