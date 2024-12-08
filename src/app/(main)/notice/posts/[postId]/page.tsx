'use client'

import { Spinner } from '@/components/common'
import { BoardNavigationButton, PostContent } from '@/components/feature'
import { useGetPost } from '@/service/data/post'

import { NoticePostDetail, NoticePostHero } from './_components'

type NoticePostPageParams = {
  params: {
    postId: string
  }
}

const NoticePostPage = ({ params }: NoticePostPageParams) => {
  const { data: post, status } = useGetPost({ postId: Number(params.postId) })

  if (status === 'pending' || !post) return <Spinner />

  return (
    <div>
      <NoticePostHero />
      <NoticePostDetail post={post} />
      <PostContent content={post.postContent} />
      <BoardNavigationButton />
    </div>
  )
}

export default NoticePostPage
