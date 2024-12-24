import { NavLink, PageBreadcrumb } from '@/components/common'
import { Separator } from '@/components/ui'

export const BoardHero = () => {
  return (
    <div className="flex w-full flex-col">
      <Separator variant="dark" />
      <PageBreadcrumb navLinks={EventPageNavLinks} pageName="행사 게시판" />
      <div className="flex flex-col gap-2 pb-5 pl-1">
        <div className="flex flex-col gap-1 text-sm">
          <div>🗓️ 개강총회/종강총회/성과공유회</div>
          <div>🎉 해크닉/MT/슬기로운 해달생활</div>
          <div>💡 아이디어톤/해커톤</div>
          <div>🎓 진로특강/취업특강</div>
        </div>
      </div>
      <Separator variant="dark" />
    </div>
  )
}

const EventPageNavLinks: NavLink[] = [
  {
    index: 0,
    link: '/event',
    name: '행사',
  },
]
