'use client'

import { DialogTitle } from '@radix-ui/react-dialog'
import Link from 'next/link'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from '@/components/ui'

type SignupSuccessDialogProps = {
  open: boolean
  setOpen: (oepn: boolean) => void
}

export const SignupSuccessDialog = ({
  open,
  setOpen,
}: SignupSuccessDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>회원 가입을 축하드립니다🎉</DialogTitle>
          <DialogDescription>관리자의 승인을 기다려주세요.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Link href="/">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                메인 화면으로 돌아가기
              </Button>
            </Link>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
