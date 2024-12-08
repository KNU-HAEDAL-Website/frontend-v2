import { NavigationItem } from './NavigationItem'

export const Navigation = () => {
  return (
    <ul className="flex flex-row gap-10">
      {navigationLinks.map((route) => (
        <li key={route.href}>
          <NavigationItem name={route.name} href={route.href} />
        </li>
      ))}
    </ul>
  )
}

export const navigationLinks = [
  {
    name: '활동',
    href: '/activity/init',
  },
  {
    name: '행사',
    href: '/event',
  },
  {
    name: '공지',
    href: '/notice',
  },
  {
    name: '모집',
    href: '/recruit',
  },
] as const
