import { Separator } from '@/components/ui'

import { EventBoardArea, EventHero, EventInstagramArea } from './_components'

const EventPage = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center">
      <EventHero />
      <EventBoardArea />
      <Separator />
      <EventInstagramArea />
    </div>
  )
}

export default EventPage
