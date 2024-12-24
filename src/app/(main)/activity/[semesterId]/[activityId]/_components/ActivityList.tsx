'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ActivitySkeleton } from '@/components/feature'
import { Button, buttonVariants } from '@/components/ui'
import { cn } from '@/lib/utils'
import { activityQueries } from '@/service/api'

type ActivityListProps = {
  semesterId: number
  activityId: number
}

export const ActivityList = ({ semesterId, activityId }: ActivityListProps) => {
  const { data: activities, status } = useQuery(
    activityQueries.list({ semesterId }),
  )

  const pathName = usePathname()
  const basePath = pathName.split('/').slice(0, -1).join('/')

  if (status === 'pending') return <ActivitySkeleton />
  if (!activities?.length) return <div>활동이 없습니다.</div>

  return (
    <div className="flex justify-center gap-2">
      {activities.map((activity) => (
        <Link
          key={activity.activityId}
          href={`${basePath}/${activity.activityId}`}
        >
          <Button
            className={cn(
              buttonVariants({
                variant:
                  activityId === activity.activityId ? 'default' : 'secondary',
              }),
              'h-3 rounded-full p-4',
            )}
          >
            {activity.activityName}
          </Button>
        </Link>
      ))}
    </div>
  )
}
