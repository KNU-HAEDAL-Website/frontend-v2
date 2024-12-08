import { ReactNode } from 'react'

import { Label } from '@/components/ui'

interface SectionWithTitleProps {
  title: string
  children: ReactNode
}

export const SectionWithTitle = ({
  title,
  children,
}: SectionWithTitleProps) => {
  return (
    <div className="flex w-full max-w-screen-2xl flex-col gap-2 p-6">
      <Label className="text-xl font-semibold">{title}</Label>
      <div className="w-full">{children}</div>
    </div>
  )
}
