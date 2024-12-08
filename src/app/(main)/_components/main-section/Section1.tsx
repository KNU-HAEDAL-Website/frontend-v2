import { Content } from '@/components/common'

export const Section1 = () => {
  return (
    <Content className="bg-primary px-10 py-40 text-white md:px-10">
      <div className="flex w-full flex-1 flex-col gap-10">
        <div className="flex w-full flex-col gap-2 text-4xl">
          <div>경북대학교 IT대학 학술동아리 </div>
          <div className="text-5xl">HAEDAL</div>
        </div>
        <div className="flex flex-col gap-2 text-lg">
          <div>
            <strong>해달</strong>은{' '}
            <strong className="bg-yellow-400 px-1 text-primary">
              SW 가치 확산
            </strong>
            이라는 목표를 가지고 다양한 코딩 행사를 진행하는 동아리입니다.
          </div>
          <div>
            비전공자도 상관없이 코딩에 관심이 있는 사람이라면{' '}
            <strong className="bg-yellow-400 px-1 text-primary">누구나</strong>{' '}
            함께하실 수 있습니다.
          </div>
        </div>
      </div>
    </Content>
  )
}
