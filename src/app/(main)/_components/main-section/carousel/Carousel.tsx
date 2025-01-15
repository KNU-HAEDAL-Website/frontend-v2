'use client'

import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

import { Card, CardContent } from '@/components/ui'
import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { EVENTS_WHOLE_YEAR as Events } from '../eventsData'

export const Carousel = () => {
  return (
    <CarouselComponent
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 2000 })]}
      className="flex w-full flex-col items-center px-12 sm:w-5/6 md:w-4/5 lg:w-2/3"
    >
      <div className="flex flex-row items-center gap-3">
        <CarouselPrevious className="hidden sm:inline" />
        <CarouselContent>
          {Events.map((item, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="relative flex aspect-video flex-col p-0">
                    <div className="flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl">
                      <Image
                        alt={item.title}
                        src={item.imageUrl}
                        width="0"
                        height="0"
                        sizes="100vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-2 break-keep rounded-b-lg bg-gradient-to-t from-slate-100 via-slate-100/90 to-transparent px-4 pb-4 pt-8 sm:px-6">
                      <div className="flex flex-row flex-wrap items-center justify-between">
                        <p className="md:text-md whitespace-nowrap text-base font-semibold leading-normal lg:text-xl">
                          {item.title}
                        </p>
                        <strong className="lg:text-md bg-yellow-400 px-0.5 text-sm md:text-base">
                          {item.month}
                        </strong>
                      </div>
                      <p className="hidden text-xs text-slate-600 md:inline md:text-base lg:text-lg">
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 top-0 inline break-keep rounded-lg bg-slate-600/80 px-4 py-4 text-base text-white opacity-0 hover:opacity-100 active:opacity-100 sm:px-6 md:hidden">
                      {item.description}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="hidden sm:inline" />
      </div>
      <CarouselDots className="pt-4" />
    </CarouselComponent>
  )
}
