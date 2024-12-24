import { ReactNode } from 'react'

const ActivityLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full max-w-screen-xl flex-col gap-2 px-12 sm:px-20">
      {children}
    </div>
  )
}

export default ActivityLayout
