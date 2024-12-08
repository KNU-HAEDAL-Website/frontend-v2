import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

interface ContentProps extends HTMLAttributes<HTMLDivElement> {}

export const Content = ({ className, children }: ContentProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="mx-auto flex h-full max-w-screen-2xl justify-center">
        {children}
      </div>
    </div>
  )
}
