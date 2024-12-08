'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui'
import { useGetPostsSlider } from '@/service/data/post'

export const EventCarousel = () => {
  const router = useRouter()

  const { data, status } = useGetPostsSlider({})

  if (status === 'pending' || !data?.posts.length) return <CarouselSkeleton />

  return (
    <Carousel
      opts={{ loop: true }}
      className="w-full max-w-52 xs:max-w-sm sm:max-w-xl"
    >
      <CarouselContent>
        {data.posts.map((post) => (
          <CarouselItem key={post.postId}>
            <div className="p-1">
              <Card
                onClick={() => router.push(`/event/board/posts/${post.postId}`)}
                className="cursor-pointer"
              >
                <CardContent className="relative flex aspect-video flex-col p-0">
                  <div className="flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl">
                    <Image
                      alt={post.postTitle}
                      src={post.postImageUrl}
                      width="0"
                      height="0"
                      sizes="100vw"
                      className="h-auto w-full"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 rounded-b-lg bg-slate-100/90 p-2 text-xs font-semibold sm:text-sm lg:p-4 lg:text-base">
                    {post.postTitle}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselDots className="pt-2" />
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

const CarouselSkeleton = () => {
  return (
    <div className="flex justify-center pb-7">
      <Card className="w-full max-w-52 overflow-hidden xs:max-w-sm sm:max-w-xl">
        <CardContent className="flex aspect-video flex-col p-0">
          <div className="w-screen flex-1 animate-pulse bg-slate-50"></div>
          <div className="h-20 w-full bg-slate-100 p-4"></div>
        </CardContent>
      </Card>
    </div>
  )
}
