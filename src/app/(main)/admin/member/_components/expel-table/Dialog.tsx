import { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { ActiveUser } from '@/types/user'

import { ExpelMemberDialogForm } from './DialogForm'

type ExpelMemberDialogProps = {
  user: ActiveUser
}

export const ExpelMemberDialog = ({ user }: ExpelMemberDialogProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          onClick={() => setOpen(true)}
          className="h-fit px-2 py-1.5"
        >
          내보내기
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md flex gap-2">
            정말 {user.userName}님을 해달 회원에서 내보내시겠어요?
          </DialogTitle>
          <DialogDescription className="text-start">
            내보내기 버튼 선택 시, 해당 회원의 계정은 삭제되며 복구되지
            않습니다.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ExpelMemberDialogForm userId={user.userId} setDialogOpen={setOpen} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
