export interface ProjectItem {
  readonly id: string
  readonly title: string
  readonly description: string
  readonly image: string
  readonly href: string
  readonly coverColor: string
}

export const allProjectsHref = '/projects'

export const projects = [
  {
    id: 'haedal-home',
    title: '해달 홈페이지',
    description:
      '해달의 활동과 문화를 한곳에 담은 공식 웹사이트 프로젝트입니다.',
    image: '/images/projects/haedal-home.webp',
    href: '/projects/haedal-home',
    coverColor: '#e5e5e5',
  },
  {
    id: 'library-system',
    title: '도서 관리 시스템',
    description: '동아리 보유 도서의 대여와 반납을 더 간단하게 관리합니다.',
    image: '/images/projects/library-system.webp',
    href: '/projects/library-system',
    coverColor: '#d6d6d6',
  },
  {
    id: 'assignment-platform',
    title: '과제 관리 플랫폼',
    description: '부트캠프 과제 제출과 피드백 과정을 연결한 협업 도구입니다.',
    image: '/images/projects/assignment-platform.webp',
    href: '/projects/assignment-platform',
    coverColor: '#c5c5c5',
  },
  {
    id: 'study-archive',
    title: '스터디 아카이브',
    description:
      '스터디에서 쌓인 기록과 자료를 오래 남기기 위한 아카이브입니다.',
    image: '/images/projects/study-archive.webp',
    href: '/projects/study-archive',
    coverColor: '#eeeeee',
  },
  {
    id: 'hackathon-project',
    title: '해커톤 프로젝트',
    description:
      '짧은 시간 동안 아이디어를 실제 서비스로 발전시킨 결과물입니다.',
    image: '/images/projects/hackathon-project.webp',
    href: '/projects/hackathon-project',
    coverColor: '#b8b8b8',
  },
  {
    id: 'bootcamp-results',
    title: '부트캠프 결과물',
    description:
      '처음 코드를 배운 부원들이 완성한 작지만 단단한 프로젝트입니다.',
    image: '/images/projects/bootcamp-results.webp',
    href: '/projects/bootcamp-results',
    coverColor: '#dadada',
  },
] as const satisfies readonly ProjectItem[]
