import { Separator, Skeleton } from '@/components/ui'

export const SkeletonTable = () => {
  return (
    <div className="flex w-full max-w-screen-lg flex-col gap-2">
      <div className="flex items-center justify-end space-x-2">
        <Skeleton className="h-7 w-6 bg-secondary" />
        <Skeleton className="h-7 w-36 bg-secondary/80" />
      </div>
      <div className="flex h-10 w-full items-center justify-around">
        <Skeleton className="h-6 w-20 md:w-24" />
        <Skeleton className="h-6 w-32 md:w-40" />
        <Skeleton className="h-6 w-24 md:w-32" />
        <Skeleton className="h-6 md:w-32 lg:w-52" />
      </div>
      <Separator />
      <div className="flex flex-col gap-2">
        <Skeleton className="my-2 h-6 w-full" />
        <Skeleton className="my-2 h-6 w-full" />
        <Skeleton className="my-2 h-6 w-full" />
      </div>
      <div className="flex justify-center pt-2">
        <Skeleton className="h-6 w-1/6 bg-primary/40" />
      </div>
    </div>
  )
}
