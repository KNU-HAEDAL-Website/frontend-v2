import { Logo } from '@/components/common'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex h-fit min-h-screen flex-col items-center justify-center gap-4 bg-primary py-20">
      <Logo className="w-40 sm:w-52" />
      {children}
    </main>
  )
}

export default AuthLayout
