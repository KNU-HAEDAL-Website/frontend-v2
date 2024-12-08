import { ChevronRightIcon } from '@radix-ui/react-icons'

import { Separator } from '@/components/ui'

export const BoardHeroSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col">
      <Separator variant="dark" />
      <div className="my-4 flex items-center gap-1.5 pb-1">
        <div className="h-5 w-12 rounded-lg bg-slate-200"></div>
        <ChevronRightIcon className="text-muted-foreground" />
        <div className="h-5 w-20 rounded-lg bg-slate-100"></div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-7 w-32 bg-slate-200"></div>
        <div className="h-6 w-12 rounded-2xl border border-input bg-secondary/50"></div>
      </div>
      <div className="flex py-4">
        <div className="h-5 w-40 bg-primary/20"></div>
      </div>
      <Separator variant="dark" />
    </div>
  )
}
