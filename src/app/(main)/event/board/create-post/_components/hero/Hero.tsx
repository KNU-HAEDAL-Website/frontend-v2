import { NavLink, PageBreadcrumb } from '@/components/common'
import { Separator } from '@/components/ui'

export const CreateEventPostHero = () => {
  return (
    <div>
      <Separator variant="dark" />
      <PageBreadcrumb navLinks={EventPageNavLinks} pageName="게시글 생성하기" />
      <Separator variant="dark" />
    </div>
  )
}

const EventPageNavLinks: NavLink[] = [
  {
    index: 0,
    link: '/event',
    name: '행사 갤러리',
  },
  {
    index: 1,
    link: '/event/board',
    name: '행사 게시판',
  },
]
