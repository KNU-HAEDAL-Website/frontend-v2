'use client'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { Form } from '@/components/ui'
import { CreateMypage, CreateMypageSchema } from '@/schema/mypage'

import { UserImgSection, UserInfoSection } from './_components'

const MyPage = () => {
  const form = useForm({
    resolver: zodResolver(CreateMypageSchema),
    defaultValues: {
      introduction: '',
      socialInfo: {
        github: '',
        instagram: '',
      },
      profileImage: new File([], ''),
    },
  })

  const onSubmit = (data: CreateMypage) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={() => onSubmit}
        className="mb-30 mt-1 w-full max-w-screen-xl px-12 pb-20 pt-10 md:mt-5 md:px-20"
      >
        <div>
          <UserImgSection
            studentId={mypageMockData.studentId}
            name={mypageMockData.name}
            role={mypageMockData.role}
          />
          <UserInfoSection
            githubInfo={mypageMockData.socialInfo.github}
            instagramInfo={mypageMockData.socialInfo.instagram}
            profileIntro={mypageMockData.introduction}
          />
        </div>
      </form>
    </Form>
  )
}

export default MyPage

const mypageMockData = {
  introduction: '도비는 자유에요!',
  userId: '3',
  studentId: '2099111222',
  name: '호반우',
  role: 'ROLE_ADMIN',
  socialInfo: {
    github: 'hobanwo',
    instagram: 'hobanwo',
  },
  // profileImage: new File([], ''),
  profileImage: 'https://github.com/shadcn.png',
}
