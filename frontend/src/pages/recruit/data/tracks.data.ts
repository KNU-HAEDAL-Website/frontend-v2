export type TrackStatus = 'open' | 'closed'

export type WorkspaceItemTone = 'default' | 'link' | 'document'

export interface WorkspaceItem {
  text: string
  tone?: WorkspaceItemTone
}

export interface WorkspaceSection {
  title: string
  items: WorkspaceItem[]
}

export interface TrackActivity {
  title: string
  note?: string
}

export interface Track {
  id: string
  name: string

  status: TrackStatus
  statusLabel: string

  meta: string
  description: string

  workspace: WorkspaceSection[]
  workspaceCaption: string

  activities: TrackActivity[]

  notionHref: string

  ctaLabel: string
  applyHref?: string

  schedule: string
}

export const tracks: Track[] = [
  {
    id: 'data',
    name: '데이토(DATTO)',

    status: 'open',
    statusLabel: '모집중',

    meta: '5기 · 정원 12명',
    description: '논문을 읽고, 직접 구현하고, 대회에서 검증합니다.',

    workspace: [
      {
        title: '캐글 대회 준비',
        items: [
          { text: '5월 2일 EDA 세션 자료' },
          { text: '피처 엔지니어링 정리본' },
          { text: '대회 회고 (1)', tone: 'link' },
          { text: '참고 노트북 모음', tone: 'document' },
        ],
      },
      {
        title: '논문 리뷰',
        items: [
          {
            text: 'Attention Is All You Need',
            tone: 'document',
          },
          {
            text: '발표 순서표',
            tone: 'document',
          },
        ],
      },
      {
        title: '실험 기록',
        items: [
          {
            text: '하이퍼파라미터 로그',
            tone: 'document',
          },
        ],
      },
    ],

    workspaceCaption: '실제 트랙 노션. 세션 자료와 실험 기록이 매주 쌓입니다.',

    activities: [
      {
        title: '매주 1인 논문 리뷰, 코드 재현까지',
      },
      {
        title: 'EDA부터 피처 엔지니어링까지 직접',
      },
      {
        title: '캐글 대회 팀 단위 참여',
        note: '방학 포함',
      },
      {
        title: '실험 기록과 재현 가능한 코드 관리',
      },
      {
        title: '학기말 프로젝트 발표',
      },
    ],

    notionHref: '#',
    ctaLabel: '지원서 작성',
    applyHref: '#',

    schedule: '매주 수 19:00 · 서류 후 면접 · 8월 20일 마감',
  },

  {
    id: 'sql',
    name: '나첫SQL',

    status: 'open',
    statusLabel: '모집중',

    meta: '3기 · 정원 10명',
    description: '느린 쿼리를 빠르게 만드는 데까지 갑니다.',

    workspace: [
      {
        title: '인덱스 스터디',
        items: [
          { text: '실행 계획 읽는 법' },
          { text: '인덱스 걸었는데 왜 안 빨라지죠?' },
          {
            text: '복합 인덱스 순서 정리',
            tone: 'link',
          },
          {
            text: '정규화 vs 반정규화',
            tone: 'document',
          },
        ],
      },
      {
        title: '실습 환경',
        items: [
          {
            text: '샘플 DB 세팅 방법',
            tone: 'document',
          },
          {
            text: '100만 건 더미 데이터 만들기',
            tone: 'document',
          },
        ],
      },
      {
        title: '트러블슈팅',
        items: [
          {
            text: '접속이 안 될 때 체크리스트',
            tone: 'document',
          },
        ],
      },
    ],

    workspaceCaption:
      '실제 트랙 노션. 스터디 자료와 시행착오 기록이 그대로 남습니다.',

    activities: [
      {
        title: '실행 계획 읽고 병목 직접 찾기',
      },
      {
        title: '인덱스 설계와 함정들',
      },
      {
        title: '정규화·반정규화 판단 기준 세우기',
      },
      {
        title: '100만 건 데이터로 튜닝 실습',
      },
      {
        title: '실제 서비스 스키마 뜯어보고 리뷰',
      },
    ],

    notionHref: '#',
    ctaLabel: '지원서 작성',
    applyHref: '#',

    schedule: '매주 화 19:00 · 서류 심사 · 8월 20일 마감',
  },

  {
    id: 'embedded',
    name: 'CORE (임베디드)',

    status: 'closed',
    statusLabel: '마감',

    meta: '7기 · 정원 8명',
    description: '화면 밖에서 실제로 움직이는 걸 만듭니다.',

    workspace: [
      {
        title: '아두이노 기초',
        items: [
          { text: '회로 연결 전 확인할 것들' },
          { text: '보드 태워먹은 사례 모음' },
          {
            text: '부품 리스트와 구매처',
            tone: 'link',
          },
          {
            text: '센서별 예제 코드',
            tone: 'document',
          },
        ],
      },
      {
        title: 'STM32로 넘어가기',
        items: [
          {
            text: '개발 환경 세팅',
            tone: 'document',
          },
          {
            text: '디버거 물리는 법',
            tone: 'document',
          },
        ],
      },
      {
        title: '학기말 프로젝트',
        items: [
          {
            text: '작년 결과물 정리',
            tone: 'document',
          },
        ],
      },
    ],

    workspaceCaption:
      '실제 트랙 노션. 부품 정보부터 실험과 사고 기록까지 남깁니다.',

    activities: [
      {
        title: '회로 기초와 브레드보드 실습',
      },
      {
        title: '센서 값 읽고 모터 돌리기',
      },
      {
        title: '인터럽트와 타이머 다루기',
      },
      {
        title: '아두이노에서 STM32로',
        note: '난이도 급상승',
      },
      {
        title: '학기말 하드웨어 프로젝트 제작',
      },
    ],

    notionHref: '#',
    ctaLabel: '모집 마감',

    schedule: '매주 목 18:00 · 다음 학기에 만나요',
  },
]
