'use client'

import { useQuery } from '@tanstack/react-query'

import { Spinner } from '@/components/common'
import { BoardNavigationButton, PostContent } from '@/components/feature'
import { PostQuries } from '@/service/api'

import { NoticePostDetail, NoticePostHero } from './_components'

type NoticePostPageParams = {
  params: {
    postId: string
  }
}

const NoticePostPage = ({ params }: NoticePostPageParams) => {
  const { data: post, status } = useQuery(
    PostQuries.detail({ postId: Number(params.postId) }),
  )

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
