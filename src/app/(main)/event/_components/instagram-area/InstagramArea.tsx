'use client'

import { useEffect, useState } from 'react'

import { OpenInNewWindowIcon } from '@radix-ui/react-icons'
import { throttle } from 'lodash'
import Image from 'next/image'

export const InstagramArea = () => {
  const [itemCount, setItemCount] = useState(12)

  useEffect(() => {
    const updateItemCount = () => {
      if (window.innerWidth < 640) {
        setItemCount(9)
      } else {
        setItemCount(12)
      }
    }

    const throttledResize = throttle(updateItemCount, 200)

    updateItemCount()
    window.addEventListener('resize', throttledResize)

    return () => {
      window.removeEventListener('resize', throttledResize)
    }
  }, [])

  return (
    <div className="relative flex w-full flex-col items-center justify-center px-12 pb-20 pt-8">
      <div className="text-semibold pointer flex items-center gap-2 text-xl leading-10">
        <span>Instagram</span>
        <OpenInNewWindowIcon
          className="cursor-pointer text-slate-400"
          onClick={() =>
            window.open('https://instagram.com/knu.haedal', '_blank')
          }
        />
      </div>
      <p className="mb-8 text-primary">
        해달 인스타그램을 팔로우하고 다양한 소식을 접하실 수 있어요!
      </p>
      <div className="grid w-full grid-cols-3 items-center justify-center gap-2 sm:grid-cols-4 md:grid-cols-6">
        {Array.from({ length: itemCount }).map((_, index) => (
          <div
            key={index}
            className="flex aspect-square w-full items-center justify-center border border-gray-200 bg-slate-50"
          >
            <Image src="" alt="" />
          </div>
        ))}
      </div>
    </div>
  )
}
