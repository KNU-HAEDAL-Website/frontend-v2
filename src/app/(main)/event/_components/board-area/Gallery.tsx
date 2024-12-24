'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Card, CardContent } from '@/components/ui'
import { useGetPostsSlider } from '@/service/data/post'

export const Gallery = () => {
  const router = useRouter()
  const { data, status } = useGetPostsSlider({})

  if (status === 'pending' || !data?.posts.length) return <GallerySkeleton />

  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.posts.map((post) => (
        <Card
          key={post.postId}
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
      ))}
    </div>
  )
}

const GallerySkeleton = () => {
  return (
    <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {Array(6)
        .fill(null)
        .map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="flex aspect-video flex-col p-0">
              <div className="w-screen flex-1 animate-pulse bg-slate-50"></div>
              <div className="h-20 w-full bg-slate-100 p-4"></div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}
