'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

import { Spinner } from '@/components/common'
import { BoardNavigationButton, PostContent } from '@/components/feature'
import { DATA_ERROR_MESSAGES } from '@/constant/errorMessage'
import { PostQuries, boardQueries } from '@/service/api'

import { ActivityPostDetail, ActivityPostHero } from './_components'

type PostPageParams = {
  params: {
    activityId: string
    boardId: string
    postId: string
  }
}

const PostPage = ({ params }: PostPageParams) => {
  const { data: board } = useSuspenseQuery(
    boardQueries.detail({
      activityId: Number(params.activityId),
      boardId: Number(params.boardId),
    }),
  )
  const { data: post, status } = useQuery(
    PostQuries.detail({ postId: Number(params.postId) }),
  )

  if (!board) throw new Error(DATA_ERROR_MESSAGES.BOARD_DETAIL_NOT_FOUND)

  if (status === 'pending')
    return (
      <div className="flex justify-center pt-10">
        <Spinner />
      </div>
    )

  if (!post) return <div>게시글 정보가 없습니다.</div>

  return (
    <div className="pt-10">
      <ActivityPostHero boardName={board.boardName} />
      <ActivityPostDetail boardId={board.boardId} post={post} />
      <PostContent content={post.postContent} />
      <BoardNavigationButton />
    </div>
  )
}

export default PostPage
