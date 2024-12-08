import { Content } from '@/components/common'

const RecruitPage = () => {
  return (
    <div className="w-full bg-primary text-white">
      <Content className="flex flex-col gap-10 px-10 py-20 md:px-20">
        <div className="w-full text-4xl">지금은 모집 기간이 아닙니다</div>
        <div>
          <div>2024년 하반기 모집이 완료되었습니다.</div>
          <div>다음 모집은 2025년 2월에 예정되어 있습니다.</div>
        </div>
      </Content>
    </div>
  )
}

export default RecruitPage
