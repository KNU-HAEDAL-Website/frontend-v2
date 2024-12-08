'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'

import { useToast } from '@/components/ui'
import { Signup, SignupSchema } from '@/schema/auth'
import { signupAction } from '@/service/server/auth/signup'

import { useSignupCheckStore } from '~auth/signup/_stores/signup-check'

export const useSignupForm = () => {
  const { execute, result, isExecuting } = useAction(signupAction)
  const isValidUserId = useSignupCheckStore((state) => state.isValidUserId)
  const isValidStudentNumber = useSignupCheckStore(
    (state) => state.isValidStudentNumber,
  )
  const { toast } = useToast()
  const isSuccessSignup = result.data?.status === 201

  const form = useForm<Signup>({
    resolver: zodResolver(SignupSchema),
    mode: 'onChange',
    defaultValues: {
      userId: '',
      password: '',
      confirmPassword: '',
      studentNumber: '',
      userName: '',
      checked: false,
    },
  })

  useEffect(() => {
    try {
      if (result.validationErrors) {
        const validationError = Object.values(result.validationErrors).flatMap(
          (error) => error,
        )[0]

        throw new Error(validationError)
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
        })
      }
    }
  }, [result, toast])

  const onSubmit = () => {
    try {
      if (!isValidUserId) {
        throw new Error('아이디 중복 확인을 진행해주세요.')
      }

      if (!isValidStudentNumber) {
        throw new Error('학번 중복 확인을 진행해주세요.')
      }

      execute(form.getValues())
    } catch (error) {
      if (error instanceof Error) {
        if (!isValidUserId || !isValidStudentNumber)
          toast({
            title: error.message,
          })
      }
    }
  }

  return {
    form,
    result,
    isExecuting,
    onSubmit,
    isSuccessSignup,
  }
}
