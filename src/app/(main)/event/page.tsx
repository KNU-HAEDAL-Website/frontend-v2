import Link from 'next/link'

import { Button } from '@/components/ui'

import { EventCarousel, EventHero } from './_components'

const EventPage = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center gap-10 pb-20">
      <EventHero />
      <div className="flex w-full flex-col gap-2 px-20">
        <EventCarousel />
        <div className="flex w-full justify-end pr-4">
          <Link href="/event/board">
            <Button variant="link" className="h-fit p-0 text-primary/60">
              더보기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventPage
