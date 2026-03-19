import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { IconButton } from '@/components/common'
import { BASE_URL } from '@/service/config'
import haedalBg from '@/assets/images/haedal-background.png'

interface TrumpMemberCardProps {
  userName: string
  userImageUrl?: string
  userDetail?: string
  githubId?: string
  instagramId?: string
  position?: string
  /** Card visual rank (A, 2-10, J, Q, K) */
  rank?: string
  /** Card visual suit */
  suit?: '♠' | '♥' | '♦' | '♣'
  /** Is the card currently showing its back? */
  isFlipped?: boolean
  /** Has been matched in memory game */
  isMatched?: boolean
  /** Click handler */
  onClick?: () => void
  /** For framer-motion layoutId transitions */
  layoutId?: string
  /** Custom style for animation positioning */
  style?: React.CSSProperties
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
  layoutId,
  style,
}: TrumpMemberCardProps) => {
  const imageSrc = useMemo(() => {
    if (!userImageUrl) return undefined
    return userImageUrl.startsWith('https')
      ? userImageUrl
      : `${BASE_URL}${userImageUrl}`
  }, [userImageUrl])

  const suitColor = SUIT_COLORS[suit] || '#1a1a2e'

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{
        width: 160,
        height: 224,
        perspective: 800,
        ...style,
      }}
      onClick={onClick}
      layoutId={layoutId}
      whileHover={!isFlipped ? { y: -4 } : { scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ═══ FRONT FACE ═══ */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border-2 bg-white shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            borderColor: isMatched ? '#f59e0b' : '#e2e8f0',
            boxShadow: isMatched
              ? '0 0 20px rgba(245,158,11,0.3), 0 4px 12px rgba(0,0,0,0.1)'
              : '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          {/* Matched golden overlay */}
          {isMatched && (
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl bg-amber-400/10" />
          )}

          {/* Top-left rank & suit */}
          <div className="absolute left-2 top-1.5 flex flex-col items-center leading-none">
            <span
              className="text-sm font-black"
              style={{ color: suitColor }}
            >
              {rank}
            </span>
            <span className="text-[10px]" style={{ color: suitColor }}>
              {suit}
            </span>
          </div>

          {/* Top-right suit */}
          <div className="absolute right-2 top-2">
            <span className="text-xs" style={{ color: suitColor }}>
              {suit}
            </span>
          </div>

          {/* Center: Avatar */}
          <div className="flex h-full flex-col items-center justify-center px-3 pt-4">
            <div className="mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-slate-200 bg-slate-100 shadow-inner md:h-20 md:w-20">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt={userName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center text-2xl font-black"
                  style={{ color: suitColor }}
                >
                  {suit}
                </div>
              )}
            </div>

            {/* Name */}
            <div className="w-full truncate text-center text-sm font-bold text-slate-800">
              {userName}
            </div>

            {/* Position / Role */}
            {position && (
              <div className="text-[10px] font-semibold text-slate-500">
                {position}
              </div>
            )}

            {/* Detail */}
            <div className="mt-1 line-clamp-2 w-full text-center text-[9px] leading-tight text-slate-400">
              {userDetail || '한 줄 소개가 없습니다'}
            </div>

            {/* Social */}
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

          {/* Bottom-right rank (upside down) */}
          <div className="absolute bottom-1.5 right-2 rotate-180">
            <div className="flex flex-col items-center leading-none">
              <span
                className="text-sm font-black"
                style={{ color: suitColor }}
              >
                {rank}
              </span>
              <span className="text-[10px]" style={{ color: suitColor }}>
                {suit}
              </span>
            </div>
          </div>
        </div>

        {/* ═══ BACK FACE ═══ */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border-2 border-indigo-400 shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={haedalBg}
            alt="HAEDAL"
            className="h-full w-full object-contain"
            style={{ backgroundColor: '#1e1b5e' }}
          />
          {/* Subtle inner border */}
          <div className="pointer-events-none absolute inset-1.5 rounded-lg border border-white/20" />
        </div>
      </motion.div>
    </motion.div>
  )
}
