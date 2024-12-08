import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

export const ActivitySemesterSkeleton = () => {
  return (
    <div className="w-full pt-5">
      <div className="flex animate-pulse items-center justify-center gap-6">
        <ChevronLeftIcon className="h-5 w-8 text-primary/40" />
        <div className="h-6 w-14 rounded-full bg-slate-100"></div>
        <div className="h-6 w-14 rounded-full bg-slate-50"></div>
        <div className="h-6 w-14 rounded-full bg-slate-200/70"></div>
        <ChevronRightIcon className="h-5 w-8 text-primary/40" />
      </div>
    </div>
  )
}

export const AdminSemesterSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-24 rounded-full bg-slate-100"></div>
      <div className="h-9 w-24 rounded-full bg-slate-50"></div>
      <div className="h-9 w-24 rounded-full bg-slate-200/70"></div>
    </div>
  )
}
