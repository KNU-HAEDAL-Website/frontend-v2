import { kstFormat } from '@toss/date'

import { Button, DialogTrigger, FormControl } from '@/components/ui'

interface DateDialogTriggerButtonProps {
  startDate?: Date
  endDate?: Date
}

export const DateDialogTriggerButton = ({
  startDate,
  endDate,
}: DateDialogTriggerButtonProps) => {
  return (
    <DialogTrigger asChild>
      <FormControl>
        <Button variant="outline" className="flex w-full justify-start">
          {startDate ? (
            endDate ? (
              <>
                {kstFormat(startDate, 'yyyy.LL.dd')} -{' '}
                {kstFormat(endDate, 'yyyy.LL.dd')}
              </>
            ) : (
              kstFormat(startDate, 'yyyy.LL.dd')
            )
          ) : (
            <span className="font-light text-muted-foreground">
              활동 날짜를 선택해주세요
            </span>
          )}
        </Button>
      </FormControl>
    </DialogTrigger>
  )
}
