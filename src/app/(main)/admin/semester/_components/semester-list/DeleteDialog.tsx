import { Dispatch, SetStateAction } from 'react'

import { deleteSemester } from '@/servicetest/api/admin'
import { semesterQueries } from '@/servicetest/api/semester'
import { useMutation } from '@tanstack/react-query'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useToast,
} from '@/components/ui'
import { queryClient } from '@/lib/query-client'
import { Semester } from '@/types/activity'

type DeleteSemesterDialogProps = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  semester?: Semester
}

export const DeleteSemesterDialog = ({
  open,
  setOpen,
  semester,
}: DeleteSemesterDialogProps) => {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSemester,
    onSuccess: (data) => onSuccess(data.message),
  })

  const { toast } = useToast()

  const onSuccess = (message: string) => {
    toast({
      title: message,
      duration: 2000,
    })

    queryClient.invalidateQueries({ queryKey: semesterQueries.all() })

    setOpen(false)
  }

  if (!semester) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md flex gap-2">
            정말 {semester.semesterName} 학기를 삭제하시겠어요?
          </DialogTitle>
          <DialogDescription className="text-start">
            삭제하기 버튼 선택 시, 해당 학기의 모든 활동 정보는 삭제되며
            복구되지 않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2">
          <Button onClick={() => setOpen(false)} variant="secondary">
            취소하기
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutate(semester.semesterId)}
            disabled={isPending}
          >
            삭제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
