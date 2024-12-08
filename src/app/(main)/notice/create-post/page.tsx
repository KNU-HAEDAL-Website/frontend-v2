'use client'

import { useEffect } from 'react'

import { ACCESS_ERROR_MESSAGE } from '@/constant/errorMessage'
import { useMyInfoStore } from '@/store/myInfo'

import { CreateNoticePostForm, CreateNoticePostHero } from './_components'

const CreateNoticePost = () => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  useEffect(() => {
    if (role !== '해구르르') {
      throw new Error(ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR)
    }
  }, [role])

  return (
    <div className="flex flex-col gap-6">
      <CreateNoticePostHero />
      <CreateNoticePostForm />
    </div>
  )
}

export default CreateNoticePost
