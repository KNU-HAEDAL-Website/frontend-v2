export interface ActivityKeyword {
  name: string
  detail: string
}

export interface ClubActivity {
  id: string
  title: string
  description: string
  keywords?: ActivityKeyword[]
}

export interface ProjectTechGroup {
  category: string
  technologies: string[]
}

export const clubActivities: ClubActivity[] = [
  {
    id: 'track',
    title: '트랙',
    description: '함께 모여 관심 있는 분야를 학습합니다.',
    keywords: [
      { name: 'CORE', detail: '임베디드' },
      { name: '데이토', detail: '데이터 분석' },
      { name: '티모', detail: '게임 제작' },
      { name: '나의 첫 SQL', detail: '데이터베이스' },
    ],
  },
  {
    id: 'small-group',
    title: '소모임',
    description: '학술 이외의 다양한 취미를 공유합니다.',
    keywords: [
      { name: '뜨게해', detail: '뜨게질' },
      { name: '공부해', detail: '공부 기록' },
      { name: '해삼', detail: '야구' },
      { name: '해먹', detail: '맛집 공유' },
      { name: '건달', detail: '운동' },
    ],
  },
  {
    id: 'hackathon',
    title: '아이디어톤 / 해커톤',
    description: '한 학기에 한 번, 팀을 이뤄 진행합니다.',
  },
  {
    id: 'project',
    title: '프로젝트',
    description: '팀원을 모아 프로젝트를 진행해 보세요.',
  },
  {
    id: 'networking',
    title: '동아리 네트워킹 행사',
    description: '동아리 구성원들과 교류하고 친목을 쌓는 행사입니다.',
  },
  {
    id: 'career-talk',
    title: '취업 및 진로 특강',
    description:
      '현업에서 활동 중인 연사들의 경험과 진로 이야기를 들을 수 있습니다.',
  },
]

export const websiteProject = {
  title: '해달 웹사이트 프로젝트',
  summary:
    '현재 해달에서는 동아리 공식 웹사이트를 재작성하는 프로젝트를 진행 중입니다.',
  descriptions: [
    '공식 웹사이트에 직접 기여하고 \n Maintainer 또는 Contributor로 이름을 남길 수 있으며,\n여러 분야의 참여자를 필요로 합니다.',
    '장기 프로젝트로 동아리방의 서버 컴퓨터 2대를 백엔드 배포 환경으로 활용하고 지속해서 유지보수합니다.',
  ],
  techGroups: [
    {
      category: '프론트엔드',
      technologies: ['React'],
    },
    {
      category: '백엔드',
      technologies: ['Django', 'FastAPI', 'Spring Boot', 'Database'],
    },
    {
      category: '인프라 / 데브옵스',
      technologies: [
        'Docker',
        'Linux (Ubuntu)',
        'Nginx',
        'Grafana',
        'GitHub Pages',
        'CI/CD',
      ],
    },
    {
      category: '협업',
      technologies: ['Git', 'GitHub Issues', 'Pull Requests', 'Code Review'],
    },
    {
      category: '디자인',
      technologies: ['UI/UX', 'Web Design'],
    },
    {
      category: '문서화 / 기여',
      technologies: ['Documentation', 'Bug Report', 'Testing'],
    },
  ] satisfies ProjectTechGroup[],
}
