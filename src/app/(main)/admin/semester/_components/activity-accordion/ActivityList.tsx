'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { useMutation, useQuery } from '@tanstack/react-query'

import { ActivitySkeleton } from '@/components/feature'
import { useToast } from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { activityQueries, deleteActivityApi } from '@/service/api'
import { Semester } from '@/types/activity'

type ActivityListProps = {
  semester: Semester
}

export const ActivityList = ({ semester }: ActivityListProps) => {
  const { data: activities, status } = useQuery(
    activityQueries.list({ semesterId: semester.semesterId }),
  )

  const { mutate: deleteActivity } = useMutation({
    mutationFn: deleteActivityApi,
    onSuccess: (data) => onSuccess(data.message),
  })
  const { toast } = useToast()

  const onSuccess = (message: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: activityQueries.all() })
  }

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
