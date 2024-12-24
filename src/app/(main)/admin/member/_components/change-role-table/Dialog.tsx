import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'
import { UserResponseDto } from '@/service/models'

import { ChangeRoleDialogForm } from './DialogForm'

type ChangeRoleDialogProps = {
  user: UserResponseDto
}

export const ChangeRoleDialog = ({ user }: ChangeRoleDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="h-fit w-16 py-1.5 text-sm hover:bg-primary/5"
        >
          {user.role}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-md flex gap-2">
            {user.userName}({user.studentNumber}) 권한 설정
          </DialogTitle>
          <DialogDescription className="text-start">
            변경 할 등급을 선택해주세요.
          </DialogDescription>
        </DialogHeader>
        <ChangeRoleDialogForm user={user} />
      </DialogContent>
    </Dialog>
  )
}
