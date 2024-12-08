export const ActivitySkeleton = () => {
  return (
    <div className="flex w-full justify-center gap-2">
      <div className="h-8 w-16 animate-pulse rounded-full bg-slate-100"></div>
      <div className="h-8 w-20 animate-pulse rounded-full bg-slate-50"></div>
    </div>
  )
}
