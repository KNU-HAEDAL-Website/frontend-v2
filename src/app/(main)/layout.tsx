import { Content } from '@/components/common'

import { Footer } from './_components'
import { Header } from './_components/header'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col">
      <Content className="fixed z-40 h-16 w-full bg-primary text-white">
        <Header />
      </Content>
      <div className="mt-16 flex flex-1 flex-col items-center">{children}</div>
      <Content className="bg-slate-100 text-primary">
        <Footer />
      </Content>
    </main>
  )
}

export default MainLayout
