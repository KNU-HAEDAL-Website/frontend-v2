import { Suspense } from 'react'

import {
  CreateNoticePostButton,
  NoticeBoardHero,
  NoticePostListSection,
} from './_components'

const NoticeBoardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <NoticeBoardHero />
      <Suspense>
        <NoticePostListSection />
      </Suspense>
      <div className="flex w-full justify-end">
        <CreateNoticePostButton />
      </div>
    </div>
  )
}

export default NoticeBoardPage
