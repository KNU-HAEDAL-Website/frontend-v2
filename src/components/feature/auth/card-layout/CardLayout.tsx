import { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface AuthCardLayoutProps {
  title: string
  children: ReactNode
  className?: string
}

export const AuthCardLayout = ({
  title,
  children,
  className,
}: AuthCardLayoutProps) => {
  return (
    <div
      className={cn(
        'flex w-3/4 max-w-96 flex-col justify-start rounded-xl border bg-card py-6 text-card-foreground md:w-2/3',
        className,
      )}
    >
      <div className="flex justify-center pb-10 font-semibold">{title}</div>
      <div className="flex w-full flex-1 flex-col items-start justify-center gap-2 px-6">
        {children}
      </div>
    </div>
  )
}
