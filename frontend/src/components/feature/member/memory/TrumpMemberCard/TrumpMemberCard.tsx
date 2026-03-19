import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'

import haedalBg from '@/assets/images/haedal-background.png'
import { IconButton } from '@/components/common'
import { cn } from '@/lib/utils'
import { BASE_URL } from '@/service/config'

interface TrumpMemberCardProps {
  userName: string
  userImageUrl: string
  userDetail?: string
  githubId?: string
  instagramId?: string
  position?: string
  rank?: string
  suit?: '♠' | '♥' | '♦' | '♣'
  isFlipped?: boolean
  isMatched?: boolean
  onClick?: () => void
}

const SUIT_COLORS: Record<string, string> = {
  '♠': '#1a1a2e',
  '♥': '#c0392b',
  '♦': '#2980b9',
  '♣': '#27ae60',
}

export const TrumpMemberCard = ({
  userName,
  userImageUrl,
  userDetail,
  githubId,
  instagramId,
  position,
  rank = 'A',
  suit = '♠',
  isFlipped = false,
  isMatched = false,
  onClick,
}: TrumpMemberCardProps) => {
  const imageSrc = userImageUrl.startsWith('https')
    ? userImageUrl
    : `${BASE_URL}${userImageUrl}`

  const suitColor = SUIT_COLORS[suit] || '#1a1a2e'

  return (
    <motion.div
      className="relative h-56 w-40 cursor-pointer select-none [perspective:800px]"
      onClick={onClick}
      whileHover={!isFlipped ? { y: -4 } : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className={cn(
            'absolute inset-0 overflow-hidden rounded-xl border-2 bg-white shadow-lg [backface-visibility:hidden]',
            isMatched
              ? 'border-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.3),0_4px_12px_rgba(0,0,0,0.1)]'
              : 'border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
          )}
        >
          {isMatched && (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-amber-400/10" />
          )}

          <div className="absolute left-2 top-1.5 flex flex-col items-center leading-none">
            <span className="text-sm font-black" style={{ color: suitColor }}>
              {rank}
            </span>
            <span className="text-[10px]" style={{ color: suitColor }}>
              {suit}
            </span>
          </div>

          <div className="absolute right-2 top-2">
            <span className="text-xs" style={{ color: suitColor }}>
              {suit}
            </span>
          </div>

          <div className="flex h-full flex-col items-center justify-center px-3 pt-4">
            <div className="mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-inner md:h-20 md:w-20">
              <img
                src={imageSrc}
                alt={userName}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="w-full truncate text-center text-sm font-bold text-slate-800">
              {userName}
            </div>

            {position && (
              <div className="text-[10px] font-semibold text-slate-500">
                {position}
              </div>
            )}

            <div className="mt-1 line-clamp-2 w-full text-center text-[9px] leading-tight text-slate-400">
              {userDetail || '한 줄 소개가 없습니다'}
            </div>

            <div className="mt-1 flex gap-1.5">
              {githubId && (
                <IconButton
                  icon={<GitHubLogoIcon className="h-3.5 w-3.5" />}
                  onClick={() => {
                    window.open(
                      `https://github.com/${githubId}`,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }}
                />
              )}
              {instagramId && (
                <IconButton
                  icon={<InstagramLogoIcon className="h-3.5 w-3.5" />}
                  onClick={() => {
                    window.open(
                      `https://www.instagram.com/${instagramId}`,
                      '_blank',
                      'noopener,noreferrer',
                    )
                  }}
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-1.5 right-2 rotate-180">
            <div className="flex flex-col items-center leading-none">
              <span className="text-sm font-black" style={{ color: suitColor }}>
                {rank}
              </span>
              <span className="text-[10px]" style={{ color: suitColor }}>
                {suit}
              </span>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden rounded-xl border-2 border-indigo-400 bg-indigo-950 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <img
            src={haedalBg}
            alt="HAEDAL"
            className="h-full w-full object-contain"
          />
          <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-white/20" />
        </div>
      </motion.div>
    </motion.div>
  )
}
