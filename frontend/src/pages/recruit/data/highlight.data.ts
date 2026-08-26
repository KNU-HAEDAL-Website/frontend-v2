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
    title: '프로젝트 발표회',
    date: '2026.04.27',
    image: projectPresentationImage,
    alt: '해달 프로젝트 발표회 현장',
  },
  {
    id: 2,
    title: '해커톤',
    date: '2026.05.18',
    image: hackathonImage,
    alt: '해달 해커톤 활동',
  },
  {
    id: 3,
    title: '부트캠프',
    date: '2026.03.09',
    image: bootcampImage,
    alt: '해달 부트캠프 활동',
  },
  {
    id: 4,
    title: '트랙 네트워킹',
    date: '2026.06.01',
    image: networkingImage,
    alt: '해달 트랙 네트워킹 활동',
  },
]

export const instagram = {
  username: '@haedal.devclub',

  // 실제 인스타그램 게시물 주소로 변경
  permalink:
    'https://www.instagram.com/p/DaNpzX-FOg9/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==',

  profileUrl:
    'https://www.instagram.com/knu.haedal?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==',
}
