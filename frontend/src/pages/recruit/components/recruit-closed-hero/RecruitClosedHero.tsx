import { DrawingPinIcon } from '@radix-ui/react-icons'

import { haedalLaptop } from '@/assets/images'
import { Content } from '@/components/common'

export const RecruitClosedHero = () => {
  return (
    <Content className="bg-gradient-to-b from-[#0F172B] to-[#5e89f5] text-white">
      <div className="relative flex w-full max-w-screen-xl flex-col gap-6 px-5 py-20 md:px-12">
        <div className="flex gap-2">
          <DrawingPinIcon className="h-auto w-6 text-destructive sm:w-10" />
          <div className="w-full text-2xl sm:text-4xl">
            지금은 모집 기간이 아닙니다
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-sm sm:text-base">
          <div>2025년 하반기 모집이 완료되었습니다</div>
          <div>다음 모집은 2026년 상반기에 예정되어 있습니다</div>
        </div>
        <div className="absolute -bottom-10 right-0 z-30 sm:-bottom-12 md:-bottom-16 lg:-bottom-20">
          <img
            src={haedalLaptop}
            alt="haedal logo"
            className="h-32 w-32 sm:h-40 sm:w-40 md:h-52 md:w-52 lg:h-60 lg:w-60"
          />
        </div>
      </div>
    </Content>
  )
}
