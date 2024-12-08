'use client'

import { useEffect, useState } from 'react'

import { Button, Form } from '@/components/ui'

import { useSignupForm } from '~auth/signup/_hooks/useSignupForm'

import { SignupCheckboxField, SignupInputField } from './field'
import { SignupSuccessDialog } from './success-dialog'

export const SignupForm = () => {
  const { form, isExecuting, onSubmit, isSuccessSignup } = useSignupForm()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (isSuccessSignup && !open) {
      setOpen(true)
    }
  }, [isSuccessSignup, open])

  return (
    <Form {...form}>
      <form onSubmit={(e) => e.preventDefault()} className="w-full space-y-4">
        <SignupInputField
          name="userId"
          formLabel="아이디"
          placeholder="hobanu"
          formDescription="- ID는 영어와 숫자를 포함해 6~12자리로 입력해주세요."
          doubleCheck="userId"
        />
        <div className="space-y-1">
          <SignupInputField
            type="password"
            name="password"
            formLabel="비밀번호"
            placeholder="********"
          />
          <SignupInputField
            type="password"
            name="confirmPassword"
            formLabel="비밀번호 확인"
            placeholder="********"
            formDescription="- 비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자로 입력해주세요."
          />
        </div>
        <div className="space-y-2">
          <SignupInputField
            type="number"
            name="studentNumber"
            formLabel="학번"
            placeholder="2000123456"
            doubleCheck="studentNumber"
          />
          <SignupInputField
            name="userName"
            formLabel="이름"
            placeholder="호반우"
          />
        </div>
        <SignupCheckboxField
          name="checked"
          formLabel="관리자의 승인 후 회원가입이 완료됩니다."
        />
        <Button
          type="submit"
          className="w-full"
          disabled={isExecuting || !form.formState.isValid}
          onClick={onSubmit}
        >
          회원가입
        </Button>
      </form>
      <SignupSuccessDialog open={open} setOpen={setOpen} />
    </Form>
  )
}
