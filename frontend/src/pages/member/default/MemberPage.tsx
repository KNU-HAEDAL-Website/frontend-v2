import { useEffect, useState } from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'

import { IntersectionObserverLoader } from '@/components/common'
import { MemberCard } from '@/components/feature'
import { Label, PaginationNext, PaginationPrevious } from '@/components/ui'
import { ADMIN_2025, ADMIN_2026 } from '@/data'
import {
  getJoinSemestersApi,
  profileQueries,
  useProfileSuspensePaging,
} from '@/service/api'

export default function MemberPage() {
  const [joinSemesterData, setJoinSemesterData] = useState<string[]>([])
  const [semesterIndex, setSemesterIndex] = useState<number>(0)

  useEffect(() => {
    getJoinSemestersApi().then((data) => {
      setJoinSemesterData(data)
      setSemesterIndex(data.length - 1)
    })
  }, [])

  const currentYear = joinSemesterData[semesterIndex]?.split('_')[1] || '2026'
  const currentAdmins = currentYear === '2025' ? ADMIN_2025 : ADMIN_2026

  /**
   * 특정 연도 운영진 정보
   *
   * @note 해당 연도 운영진은 `data/admins/{year}.ts` 에 정의합니다.
   */
  const adminQueries = currentAdmins.map((admin) =>
    profileQueries.profile({ userId: admin.userId }),
  )

  const adminProfiles = useSuspenseQueries({
    queries: adminQueries,
  }).map((result, index) => ({
    ...result.data,
    position: currentAdmins[index].position,
  }))

  const {
    data: memberData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useProfileSuspensePaging({
    roles: ['ROLE_WEB_MASTER', 'ROLE_TEAM_LEADER', 'ROLE_MEMBER'],
    joinSemester: joinSemesterData[semesterIndex],
  })

  const handleLeftSemester = () => {
    if (semesterIndex > 0) {
      setSemesterIndex(semesterIndex - 1)
    }
  }
  const handleRightSemester = () => {
    if (semesterIndex < joinSemesterData.length - 1) {
      setSemesterIndex(semesterIndex + 1)
    }
  }

  const semesterTitle = () => {
    if (!joinSemesterData[semesterIndex]) return ''
    const [, year, semester] = joinSemesterData[semesterIndex].split('_')
    if (semesterIndex === 0) {
      return `${year}-${semester} 이전 멤버`
    }
    return `${year}-${semester} 멤버`
  }

  const memberProfiles = memberData?.pages.flatMap((page) => page.profiles)

  return (
    <main className="flex h-full w-full flex-col items-center pb-20">
      <div className="w-full max-w-[920px] pb-4 text-xl font-semibold">
        해구르르
      </div>
      <div className="grid w-full max-w-[320px] grid-cols-2 place-items-center gap-6 sm:max-w-[520px] sm:grid-cols-3 md:max-w-[680px] lg:max-w-[920px] lg:grid-cols-4">
        {adminProfiles.map((user) => {
          return (
            <div>
              <Label className="text-md flex justify-center pb-1">
                {user.position}
              </Label>
              <MemberCard
                key={user.userId}
                userName={user.userName}
                userImageUrl={user.profileImageUrl}
                userDetail={user.profileIntro}
                githubId={user.githubAccount}
                instagramId={user.instaAccount}
              />
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-2 pt-10 text-xl font-semibold">
        <PaginationPrevious
          to="#"
          onClick={handleLeftSemester}
          disabled={semesterIndex === 0}
          className={'cursor-pointer'}
        />
        <span>{semesterTitle()}</span>
        <PaginationNext
          to="#"
          disabled={semesterIndex === joinSemesterData.length - 1}
          onClick={handleRightSemester}
          className={'cursor-pointer'}
        />
      </div>
      <div className="text-md text-primary/60">
        해달과 {memberProfiles.length}명의 부원들이 함께 하고 있어요
      </div>
      <div className="w-full max-w-[920px] pb-4 pt-10 text-xl font-semibold">
        정회원 & 준회원
      </div>
      {memberProfiles.length ? (
        <div>
          <div className="grid w-full max-w-[320px] grid-cols-2 place-items-center gap-6 sm:max-w-[520px] sm:grid-cols-3 md:max-w-[680px] lg:max-w-[920px] lg:grid-cols-4">
            {memberProfiles.map((user) => {
              return (
                <MemberCard
                  key={user.userId}
                  userName={user.userName}
                  userImageUrl={user.profileImageUrl}
                  userDetail={user.profileIntro}
                  githubId={user.githubAccount}
                  instagramId={user.instaAccount}
                />
              )
            })}
          </div>
          {hasNextPage && (
            <IntersectionObserverLoader
              callback={() => {
                if (!isFetchingNextPage) {
                  fetchNextPage()
                }
              }}
            />
          )}
        </div>
      ) : (
        <div className="w-full max-w-[920px] text-primary/60">
          멤버가 없습니다.
        </div>
      )}
    </main>
  )
}
