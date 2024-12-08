'use client'

import { useEffect } from 'react'

import { Cross2Icon } from '@radix-ui/react-icons'
import { useAction } from 'next-safe-action/hooks'
import { useRouter } from 'next/navigation'

import { ActivitySkeleton } from '@/components/feature'
import { ToastAction, useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { activitiesQuery, useGetActivities } from '@/service/data/activity'
import { DeleteAcivityAction } from '@/service/server/activity/delete-activity'
import { Semester } from '@/types/activity'

type ActivityListProps = {
  semester: Semester
}

export const ActivityList = ({ semester }: ActivityListProps) => {
  const { data: activities, status } = useGetActivities(semester.semesterId)

  const { execute: deleteActivity, result } = useAction(DeleteAcivityAction)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (result.data?.isSuccess) {
      toast({
        title: result.data.message,
        duration: 2000,
      })

      const { queryKey } = activitiesQuery(semester.semesterId)
      queryClient.invalidateQueries({ queryKey })

      return
    }

    if (result.data?.action === 'login') {
      toast({
        title: result.data?.message,
        action: (
          <ToastAction
            onClick={() => router.push('/auth/login')}
            altText="로그인하기"
          >
            로그인하기
          </ToastAction>
        ),
      })
      return
    }

    if (result.data?.message) {
      toast({
        title: result.data.message,
      })
    }
  }, [result, toast, semester.semesterId, router])

  if (status === 'pending') return <ActivitySkeleton />

  if (!activities || !activities.length)
    return <div className="text-muted-foreground">활동이 없습니다.</div>

  return (
    <div className="flex flex-wrap gap-2">
      {activities?.map((activity) => (
        <div key={activity.activityId}>
          <div className="flex items-center gap-1 rounded-full bg-input px-4 py-1.5 text-sm">
            <div>{activity.activityName}</div>
            <Cross2Icon
              onClick={() =>
                deleteActivity({
                  semesterId: semester.semesterId,
                  activityId: activity.activityId,
                })
              }
              className="h-4 w-4 hover:cursor-pointer hover:text-primary/60"
            />
          </div>
        </div>
      ))}
    </div>
  )
}
