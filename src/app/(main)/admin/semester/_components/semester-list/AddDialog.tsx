'use client'

import { useState } from 'react'

import { PlusIcon } from '@radix-ui/react-icons'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui'

import { AddSemesterDialogForm } from './AddDialogForm'

export const AddSemesterDialog = () => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 w-9 rounded-full p-0">
          <PlusIcon className="h-5 w-5 text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>학기 추가</DialogTitle>
          <DialogDescription>연도는 숫자만 입력해주세요.</DialogDescription>
        </DialogHeader>
        <AddSemesterDialogForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
