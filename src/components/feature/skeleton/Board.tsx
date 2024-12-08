import { Card } from '@/components/ui'

export const BoardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-10">
      <Card className="flex w-full animate-pulse flex-col rounded-none border-none bg-slate-50 md:flex-row">
        <div className="aspect-video h-auto w-full animate-pulse bg-slate-200 md:max-w-96"></div>
      </Card>
      <Card className="flex w-full animate-pulse flex-col rounded-none border-none bg-slate-50/50 md:flex-row">
        <div className="aspect-video h-auto w-full animate-pulse bg-slate-100 md:max-w-96"></div>
      </Card>
    </div>
  )
}
