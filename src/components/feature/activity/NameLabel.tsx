import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface NameLabel extends HTMLAttributes<HTMLDivElement> {
  name: string
}

export const NameLabel = ({ name, className }: NameLabel) => {
  return (
    <div
      className={cn(
        'w-fit rounded-2xl border border-input bg-secondary/50 px-2 py-0.5 text-xs font-normal md:text-sm',
        className,
      )}
    >
      {name}
    </div>
  )
}
