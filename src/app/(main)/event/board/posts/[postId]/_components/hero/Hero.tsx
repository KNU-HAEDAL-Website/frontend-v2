import { NavLink, PageBreadcrumb } from '@/components/common'
import { Separator } from '@/components/ui'

export const EventPostHero = () => {
  return (
    <div>
      <Separator variant="dark" />
      <PageBreadcrumb navLinks={EventPageNavLinks} />
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
