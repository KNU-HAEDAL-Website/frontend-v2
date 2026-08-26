import bootcampImage from '../assets/images/highlights/bootcamp.png'
import hackathonImage from '../assets/images/highlights/hackathon.png'
import networkingImage from '../assets/images/highlights/networking.png'
import projectPresentationImage from '../assets/images/highlights/project-presentation.png'

export type HighlightItem = {
  id: number
  title: string
  date: string
  image: string
  alt: string
  href?: string
}

export const highlights: HighlightItem[] = [
  {
    id: 1,
    title: '트랙 활동',
    date: '',
    image: projectPresentationImage,
    alt: '해달 프로젝트 발표회 현장',
  },
  {
    id: 2,
    title: '종강총회',
    date: '',
    image: hackathonImage,
    alt: '해달 해커톤 활동',
  },
  {
    id: 3,
    title: '아이디어톤',
    date: '',
    image: bootcampImage,
    alt: '해달 부트캠프 활동',
  },
  {
    id: 4,
    title: '해커톤',
    date: '',
    image: networkingImage,
    alt: '해달 트랙 네트워킹 활동',
  },
]

export const instagram = {
  username: '',

  // 실제 인스타그램 게시물 주소로 변경
  permalink:
    'https://www.instagram.com/p/DaNpzX-FOg9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',

  profileUrl:
    'https://www.instagram.com/knu.haedal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
}
