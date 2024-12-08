'use client'

import {
  ReactElement,
  ReactNode,
  createContext,
  useContext,
  useState,
} from 'react'

import { PinLeftIcon, PinRightIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'

const SidebarContext = createContext({ expanded: true })

type SidebarProps = {
  name: string
  children: ReactNode
}

export function Sidebar({ name, children }: SidebarProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className={cn(expanded ? 'w-56' : 'w-18', 'h-full transition-all')}>
      <nav className="flex h-full flex-col border-r bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div
            className={cn(
              expanded ? '' : 'h-0 w-0',
              'overflow-hidden text-lg font-semibold transition-all',
            )}
          >
            {name}
          </div>
          <button
            onClick={() => setExpanded((cur) => !cur)}
            className="rounded-lg bg-gray-50 p-1.5 hover:bg-gray-100"
          >
            {expanded ? <PinLeftIcon /> : <PinRightIcon />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

type SidebarItemProps = {
  icon: ReactElement
  text: string
  active?: boolean
}

export function SidebarItem({ icon, text, active = false }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext)

  return (
    <li
      className={`group relative my-1 flex cursor-pointer items-center rounded-md px-3 py-2 font-medium transition-colors ${
        active ? 'bg-slate-200' : 'text-gray-600 hover:bg-slate-100'
      } `}
    >
      {icon}
      <span
        className={cn(
          expanded ? 'ml-3' : 'h-0 w-0',
          'overflow-hidden transition-all',
        )}
      >
        {text}
      </span>
      {!expanded && (
        <div
          className={`invisible absolute left-full ml-6 flex w-20 -translate-x-3 justify-center rounded-md bg-slate-100 px-2 py-1 text-sm opacity-20 transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
        >
          {text}
        </div>
      )}
    </li>
  )
}
