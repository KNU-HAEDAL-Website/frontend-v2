import { useCallback, useEffect, useMemo, useState } from 'react'

import { useSuspenseQueries } from '@tanstack/react-query'
import { AnimatePresence, motion } from 'framer-motion'

import { IntersectionObserverLoader } from '@/components/common'
import { TrumpMemberCard } from '@/components/feature/member/memory/TrumpMemberCard'
import { Label, PaginationNext, PaginationPrevious } from '@/components/ui'
import { ADMIN_2025, ADMIN_2026 } from '@/data'
import { useMemoryGame } from './hooks/useMemoryGame'
import {
  getJoinSemestersApi,
  profileQueries,
  useProfileSuspensePaging,
} from '@/service/api'

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS: ('♠' | '♥' | '♦' | '♣')[] = ['♠', '♥', '♦', '♣']

type PageMode =
  | 'browse'
  | 'transition-to-game'
  | 'game'
  | 'transition-to-browse'

export default function MemberPage() {
  const [joinSemesterData, setJoinSemesterData] = useState<string[]>([])
  const [semesterIndex, setSemesterIndex] = useState<number>(0)
  const [mode, setMode] = useState<PageMode>('browse')
  const [flippedAdminIndices, setFlippedAdminIndices] = useState<Set<number>>(
    new Set(),
  )

  useEffect(() => {
    getJoinSemestersApi().then((data) => {
      setJoinSemesterData(data)
      setSemesterIndex(data.length - 1)
    })
  }, [])

  const currentYear = joinSemesterData[semesterIndex]?.split('_')[1] || '2026'
  const currentAdmins = currentYear === '2025' ? ADMIN_2025 : ADMIN_2026

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

  const memberProfiles = useMemo(
    () => memberData?.pages.flatMap((page) => page.profiles) ?? [],
    [memberData],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const adminIds = adminProfiles.map((p) => p.userId).join(',')
  const allProfiles = useMemo(() => {
    const admins = adminProfiles.map((p) => ({
      userId: p.userId,
      userName: p.userName,
      profileImageUrl: p.profileImageUrl,
      profileIntro: p.profileIntro,
      githubAccount: p.githubAccount,
      instaAccount: p.instaAccount,
      position: p.position,
    }))
    const members = memberProfiles.map((p) => ({
      userId: p.userId,
      userName: p.userName,
      profileImageUrl: p.profileImageUrl,
      profileIntro: p.profileIntro,
      githubAccount: p.githubAccount,
      instaAccount: p.instaAccount,
    }))
    return [...admins, ...members]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminIds, memberProfiles])

  const { state: gameState, startGame, flipCard, endGame } = useMemoryGame()

  const handleLeftSemester = () => {
    if (semesterIndex > 0) setSemesterIndex(semesterIndex - 1)
  }
  const handleRightSemester = () => {
    if (semesterIndex < joinSemesterData.length - 1)
      setSemesterIndex(semesterIndex + 1)
  }

  const semesterTitle = () => {
    if (!joinSemesterData[semesterIndex]) return ''
    const [, year, semester] = joinSemesterData[semesterIndex].split('_')
    if (semesterIndex === 0) return `${year}-${semester} 이전 멤버`
    return `${year}-${semester} 멤버`
  }

  const handleFlipAdmin = useCallback((index: number) => {
    setFlippedAdminIndices((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (
      mode === 'browse' &&
      adminProfiles.length > 0 &&
      flippedAdminIndices.size === adminProfiles.length &&
      allProfiles.length >= 3
    ) {
      const timer = setTimeout(() => {
        setMode('transition-to-game')
        setTimeout(() => {
          startGame(allProfiles)
          setFlippedAdminIndices(new Set())
          setMode('game')
        }, 800)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [
    mode,
    flippedAdminIndices.size,
    adminProfiles.length,
    allProfiles,
    startGame,
  ])

  const handleEndGame = useCallback(() => {
    setMode('transition-to-browse')
    setTimeout(() => {
      endGame()
      setMode('browse')
    }, 600)
  }, [endGame])

  useEffect(() => {
    if (gameState.phase === 'completed') {
      const timer = setTimeout(() => {
        handleEndGame()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [gameState.phase, handleEndGame])

  const gameGridCols = useMemo(() => {
    const count = gameState.cards.length
    if (count <= 16) return 4
    return 5
  }, [gameState.cards.length])

  return (
    <main className="flex h-full w-full flex-col items-center pb-20">
      <AnimatePresence mode="wait">
        {(mode === 'browse' || mode === 'transition-to-game') && (
          <motion.div
            key="browse"
            className="flex w-full flex-col items-center"
            initial={mode === 'browse' ? { opacity: 1 } : false}
            animate={
              mode === 'transition-to-game'
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 w-full max-w-[920px]">
              <div className="text-xl font-semibold">해구르르</div>
            </div>

            <div className="grid w-full max-w-[380px] grid-cols-2 place-items-center gap-5 sm:max-w-[580px] sm:grid-cols-3 md:max-w-[760px] lg:max-w-[920px] lg:grid-cols-4">
              {adminProfiles.map((user, i) => (
                <div key={`admin-${i}-${user.userId}`}>
                  <Label className="text-md flex justify-center pb-1">
                    {user.position}
                  </Label>
                  <TrumpMemberCard
                    userName={user.userName}
                    userImageUrl={user.profileImageUrl}
                    userDetail={user.profileIntro}
                    githubId={user.githubAccount}
                    instagramId={user.instaAccount}
                    position={user.position}
                    rank={RANKS[i % RANKS.length]}
                    suit={SUITS[i % SUITS.length]}
                    isFlipped={flippedAdminIndices.has(i)}
                    onClick={() => handleFlipAdmin(i)}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-10 text-xl font-semibold">
              <PaginationPrevious
                to="#"
                onClick={handleLeftSemester}
                disabled={semesterIndex === 0}
                className="cursor-pointer"
              />
              <span>{semesterTitle()}</span>
              <PaginationNext
                to="#"
                disabled={semesterIndex === joinSemesterData.length - 1}
                onClick={handleRightSemester}
                className="cursor-pointer"
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
                <div className="grid w-full max-w-[380px] grid-cols-2 place-items-center gap-5 sm:max-w-[580px] sm:grid-cols-3 md:max-w-[760px] lg:max-w-[920px] lg:grid-cols-4">
                  {memberProfiles.map((user, i) => (
                    <TrumpMemberCard
                      key={user.userId}
                      userName={user.userName}
                      userImageUrl={user.profileImageUrl}
                      userDetail={user.profileIntro}
                      githubId={user.githubAccount}
                      instagramId={user.instaAccount}
                      rank={RANKS[(i + adminProfiles.length) % RANKS.length]}
                      suit={SUITS[(i + 1) % SUITS.length]}
                    />
                  ))}
                </div>
                {hasNextPage && (
                  <IntersectionObserverLoader
                    callback={() => {
                      if (!isFetchingNextPage) fetchNextPage()
                    }}
                  />
                )}
              </div>
            ) : (
              <div className="w-full max-w-[920px] text-primary/60">
                멤버가 없습니다.
              </div>
            )}
          </motion.div>
        )}

        {(mode === 'game' || mode === 'transition-to-browse') && (
          <motion.div
            key="game"
            className="flex w-full flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={
              mode === 'transition-to-browse'
                ? { opacity: 0, scale: 0.95 }
                : { opacity: 1, scale: 1 }
            }
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex w-full max-w-[920px] items-center justify-between px-2">
              <div className="text-sm font-semibold text-slate-500">
                {gameState.phase === 'completed'
                  ? '🎉 모두 맞췄습니다!'
                  : '카드 두 장을 선택하세요'}
              </div>
              <button
                onClick={handleEndGame}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-500 transition-all hover:bg-slate-50 hover:text-slate-700"
              >
                목록으로 돌아가기
              </button>
            </div>

            <div
              className="mx-auto grid place-items-center gap-3 sm:gap-4"
              style={{
                gridTemplateColumns: `repeat(${gameGridCols}, minmax(0, 1fr))`,
                maxWidth: gameGridCols * 180,
              }}
            >
              {gameState.cards.map((card, i) => {
                const isFlipped =
                  !gameState.matchedIds.has(card.id) &&
                  !gameState.flippedIds.includes(card.id)
                const isMatched = gameState.matchedIds.has(card.id)

                return (
                  <motion.div
                    key={card.id}
                    initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      delay: i * 0.04,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                  >
                    <TrumpMemberCard
                      userName={card.userName}
                      userImageUrl={card.userImageUrl ?? ''}
                      userDetail={card.userDetail}
                      githubId={card.githubId}
                      instagramId={card.instagramId}
                      position={card.position}
                      rank={card.rank}
                      suit={card.suit}
                      isFlipped={isFlipped}
                      isMatched={isMatched}
                      onClick={() => flipCard(card.id)}
                    />
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
