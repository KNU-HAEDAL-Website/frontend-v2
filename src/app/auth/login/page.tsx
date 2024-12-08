import { AuthCardLayout, LinkButton } from '@/components/feature'

import { LoginForm } from './_components'

const LoginPage = () => {
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <AuthCardLayout title="Sign in to HAEDAL">
        <LoginForm />
      </AuthCardLayout>
      <LinkButton linkTo="/auth/signup" label="회원가입" />
    </div>
  )
}

export default LoginPage
