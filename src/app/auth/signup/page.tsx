'use client'

import { AuthCardLayout, LinkButton } from '@/components/feature'

import { SignupForm } from './_components/form'

const SignupPage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <AuthCardLayout title="Sign up to HAEDAL" className="max-w-lg">
        <SignupForm />
      </AuthCardLayout>
      <div className="flex w-3/4 flex-col items-center justify-center pt-2 sm:flex-row">
        <div className="w-max text-sm text-input">계정이 이미 있으신가요?</div>
        <LinkButton linkTo="/auth/login" label="로그인하기" />
      </div>
    </div>
  )
}

export default SignupPage
