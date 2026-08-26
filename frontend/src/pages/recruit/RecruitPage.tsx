import { Footer, Header } from '@/components/feature'

import { RecruitHome } from './components/home'

export default function RecruitPage() {
  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Header />

      <div className="w-full flex-1 pt-16">
        <RecruitHome />
      </div>

      <Footer />
    </main>
  )
}
