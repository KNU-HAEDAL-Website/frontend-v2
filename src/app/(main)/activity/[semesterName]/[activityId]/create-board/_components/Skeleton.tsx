import { Spinner } from '@/components/common'
import { Separator, Skeleton } from '@/components/ui'

export const CreateBoardSkeleton = () => {
  return (
    <div className="w-full pt-10">
      <div>
        <Separator variant="dark" />
        <Skeleton className="my-4 h-5 w-full" />
        <Separator variant="dark" />
      </div>
      <Spinner />
    </div>
  )
}
