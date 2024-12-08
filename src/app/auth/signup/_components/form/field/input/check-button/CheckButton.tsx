'use client'

import { Dispatch, SetStateAction, useEffect } from 'react'

import { useAction } from 'next-safe-action/hooks'

import { Button, useFormField } from '@/components/ui'
import {
  CheckRespose,
  checkStudentNumberAction,
  checkUserIdAction,
} from '@/service/server/auth/signup'

import { useSignupCheckStore } from '~auth/signup/_stores/signup-check'

interface CheckButtonProps {
  value: string
  setCheckResult: Dispatch<SetStateAction<CheckRespose | undefined>>
}

export const CheckUserIdButton = ({
  value,
  setCheckResult,
}: CheckButtonProps) => {
  const { error } = useFormField()
  const { execute, result, isExecuting } = useAction(checkUserIdAction)
  const setIsValidUserId = useSignupCheckStore(
    (state) => state.setIsValidUserId,
  )

  useEffect(() => {
    if (result.data) {
      setCheckResult(result.data)
      setIsValidUserId(result.data.success)
    }
  }, [result.data, setCheckResult, setIsValidUserId])

  const onClick = () => {
    execute({ userId: value })
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!!error || isExecuting}
      onClick={onClick}
    >
      중복 확인
    </Button>
  )
}

export const CheckStudentNumberButton = ({
  value,
  setCheckResult,
}: CheckButtonProps) => {
  const { error } = useFormField()
  const { execute, result, isExecuting } = useAction(checkStudentNumberAction)
  const { setIsValidStudentNumber } = useSignupCheckStore()

  useEffect(() => {
    if (result.data) {
      setCheckResult(result.data)
      setIsValidStudentNumber(result.data.success)
    }
  }, [result.data, setCheckResult, setIsValidStudentNumber])

  const onClick = () => {
    execute({ studentNumber: value })
  }

  return (
    <Button
      type="button"
      variant="outline"
      disabled={!!error || isExecuting}
      onClick={onClick}
    >
      중복 확인
    </Button>
  )
}
