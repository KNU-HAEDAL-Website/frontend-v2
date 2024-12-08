import { Suspense } from 'react'

import {
  CreateEventPostButton,
  EventBoardHero,
  EventPostList,
} from './_components'

const EventBoardPage = () => {
  return (
    <div className="flex flex-col gap-10">
      <EventBoardHero />
      <Suspense>
        <EventPostList />
      </Suspense>
      <div className="flex w-full justify-end">
        <CreateEventPostButton />
      </div>
    </div>
  )
}

export default EventBoardPage
