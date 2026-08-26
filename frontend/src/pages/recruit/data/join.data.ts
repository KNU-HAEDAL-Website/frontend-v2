export type JoinInfoIcon = 'calendar' | 'users' | 'activity' | 'star'

export interface JoinInfo {
  icon: JoinInfoIcon
  label: string
  value: string
}

export interface FaqItem {
  question: string
  answer: string
}

export const joinInfo: JoinInfo[] = [
  {
    icon: 'calendar',
    label: '모집 기간',
    value: '2026. 09. 01 (화) - 09. 14 (월)',
  },
  {
    icon: 'users',
    label: '모집 대상',
    value: '대구·경북 소재 대학(원)생',
  },
  {
    icon: 'activity',
    label: '활동 내용',
    value: '스터디, 프로젝트, 세미나, 해커톤 등',
  },
  {
    icon: 'star',
    label: '지원 자격',
    value: '프로그래밍에 관심있는 누구나',
  },
]

export const faqData: FaqItem[] = [
  {
    question: '비전공자도 지원할 수 있나요?',
    answer:
      '네. 전공이나 개발 경험과 관계없이 프로그래밍과 새로운 기술에 관심이 있다면 누구나 지원할 수 있습니다.',
  },
  {
    question: '정기 모임은 언제 진행되나요?',
    answer:
      '정기 모임 일정은 학기별 활동 계획에 따라 안내됩니다. 자세한 일정은 가입 후 공지 채널을 통해 확인할 수 있습니다.',
  },
  {
    question: '프로젝트는 어떻게 참여하나요?',
    answer:
      '관심 있는 프로젝트나 트랙을 선택해 참여할 수 있습니다. 직접 새로운 프로젝트를 제안하고 팀원을 모집하는 것도 가능합니다.',
  },
  {
    question: '부트캠프와 스터디는 어떤 방식인가요?',
    answer:
      '주제별 커리큘럼을 기반으로 함께 학습합니다. 입문자를 위한 부트캠프부터 관심 분야를 깊게 공부하는 스터디까지 다양하게 운영됩니다.',
  },
  {
    question: '신입 부원 모집은 언제 하나요?',
    answer:
      '주요 모집 일정은 학기 초에 진행됩니다. 정확한 모집 기간과 세부 내용은 홈페이지와 공식 채널을 통해 안내합니다.',
  },
]

export const joinContent = {
  eyebrow: 'RECRUIT',

  title: '모집 안내',

  description:
    '해달과 함께 성장할 새로운 부원을 기다립니다. 열정과 호기심이 있다면 누구나 지원할 수 있어요.',

  faqEyebrow: 'FAQ',

  faqTitle: '자주 묻는 질문',

  ctaTitle: '지금 바로 지원하세요!',

  ctaDescription: '해달의 새로운 여정을 함께 시작할 동료를 기다립니다.',

  ctaLabel: '지원서 작성하기',

  // 실제 Google Form 주소로 변경
  ctaHref: 'https://forms.google.com/',
}
