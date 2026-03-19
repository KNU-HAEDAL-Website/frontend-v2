import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { IconButton } from '@/components/common'
import { BASE_URL } from '@/service/config'

interface TreeAvatarProps {
  userName: string
  position?: string
  userImageUrl?: string
  userDetail?: string
  githubId?: string
  instagramId?: string
  size?: 'normal' | 'large'
  variant?: number // 1-6 for different tree/plant shapes
  delay?: number
  style?: React.CSSProperties
}

export const TreeAvatar = ({
  userName,
  position,
  userImageUrl,
  userDetail,
  githubId,
  instagramId,
  size = 'normal',
  variant = 1,
  delay = 0,
  style,
}: TreeAvatarProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const imageSrc = useMemo(() => {
    if (!userImageUrl) return undefined
    return userImageUrl.startsWith('https')
      ? userImageUrl
      : `${BASE_URL}${userImageUrl}`
  }, [userImageUrl])

  const handleGithubClick = () => {
    if (!githubId) return
    window.open(`https://github.com/${githubId}`, '_blank', 'noopener,noreferrer')
  }

  const handleInstagramClick = () => {
    if (!instagramId) return
    window.open(`https://www.instagram.com/${instagramId}`, '_blank', 'noopener,noreferrer')
  }

  const w = size === 'large' ? 140 : 80
  const h = size === 'large' ? 180 : 110
  const swayAmount = size === 'large' ? 1.5 : 2.5
  const swayDuration = 3.5 + (variant % 3) * 0.8

  const getTreeSvg = () => {
    switch (variant % 6) {
      case 0:
        // 큰 둥근 나무
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="46" y="70" width="8" height="50" rx="3" fill="#6b442b" />
            <rect x="38" y="90" width="4" height="20" rx="2" fill="#6b442b" transform="rotate(-25 38 90)" />
            <rect x="58" y="85" width="4" height="18" rx="2" fill="#6b442b" transform="rotate(20 58 85)" />
            <circle cx="50" cy="45" r="38" fill="#3d8a22" />
            <circle cx="30" cy="50" r="22" fill="#4a9a2e" />
            <circle cx="70" cy="52" r="20" fill="#4a9a2e" />
            <circle cx="50" cy="28" r="24" fill="#5aaa34" />
            <circle cx="42" cy="36" r="2.5" fill="#fff" opacity="0.3" />
            <circle cx="58" cy="42" r="2" fill="#fff" opacity="0.25" />
          </svg>
        )
      case 1:
        // 밝은 둥근 나무
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="47" y="68" width="6" height="52" rx="2" fill="#755239" />
            <circle cx="50" cy="42" r="35" fill="#7bc74b" />
            <circle cx="35" cy="38" r="22" fill="#8dd45a" />
            <circle cx="65" cy="45" r="18" fill="#8dd45a" />
            <circle cx="50" cy="22" r="20" fill="#9de06a" />
            <circle cx="40" cy="30" r="2" fill="#fff" opacity="0.4" />
            <circle cx="55" cy="38" r="1.5" fill="#fff" opacity="0.35" />
            <circle cx="62" cy="32" r="2.5" fill="#fff" opacity="0.3" />
          </svg>
        )
      case 2:
        // 타원형 어두운 나무
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="46" y="72" width="8" height="48" rx="3" fill="#583925" />
            <ellipse cx="50" cy="48" rx="32" ry="42" fill="#3a7a28" />
            <ellipse cx="38" cy="45" rx="18" ry="28" fill="#448c2e" />
            <ellipse cx="62" cy="50" rx="16" ry="24" fill="#448c2e" />
          </svg>
        )
      case 3:
        // 덤불형 (작은 멤버용)
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="50" cy="75" rx="40" ry="30" fill="#5aaa34" />
            <ellipse cx="35" cy="70" rx="25" ry="22" fill="#6db83e" />
            <ellipse cx="65" cy="72" rx="22" ry="20" fill="#6db83e" />
            <ellipse cx="50" cy="58" rx="28" ry="20" fill="#7bc74b" />
            <circle cx="40" cy="62" r="2" fill="#fff" opacity="0.3" />
            <circle cx="55" cy="55" r="2.5" fill="#fff" opacity="0.25" />
            <circle cx="60" cy="68" r="1.5" fill="#fff" opacity="0.3" />
          </svg>
        )
      case 4:
        // 삼각형 침엽수
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="47" y="75" width="6" height="45" rx="2" fill="#6b442b" />
            <polygon points="50,8 20,55 80,55" fill="#3d8a22" />
            <polygon points="50,22 25,68 75,68" fill="#4a9a2e" />
            <polygon points="50,38 28,80 72,80" fill="#5aaa34" />
          </svg>
        )
      case 5:
      default:
        // 넓은 수관의 나무
        return (
          <svg width="100%" height="100%" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
            <rect x="46" y="65" width="8" height="55" rx="3" fill="#755239" />
            <rect x="36" y="80" width="4" height="25" rx="2" fill="#6b442b" transform="rotate(-35 36 80)" />
            <rect x="60" y="78" width="4" height="22" rx="2" fill="#6b442b" transform="rotate(30 60 78)" />
            <circle cx="50" cy="42" r="36" fill="#42811e" />
            <circle cx="28" cy="48" r="20" fill="#4d9426" />
            <circle cx="72" cy="46" r="18" fill="#4d9426" />
            <circle cx="40" cy="26" r="20" fill="#5ca631" />
            <circle cx="60" cy="28" r="18" fill="#5ca631" />
          </svg>
        )
    }
  }

  return (
    <div
      className="group pointer-events-auto absolute flex flex-col items-center justify-end"
      style={{ width: w, height: h, ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <motion.div
        className="origin-bottom cursor-pointer"
        style={{ width: '100%', height: '100%' }}
        animate={{ rotate: [-swayAmount, swayAmount, -swayAmount] }}
        transition={{ duration: swayDuration, delay, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.08, transition: { duration: 0.2 } }}
      >
        {getTreeSvg()}
      </motion.div>

      {/* Name Label */}
      <div className="pointer-events-none absolute -bottom-5 z-10 text-center">
        <span className="whitespace-nowrap rounded-full border border-white/40 bg-white/80 px-2 py-0.5 text-[10px] font-bold text-slate-800 shadow-sm backdrop-blur-sm sm:text-xs">
          {position ? `${position} · ${userName}` : userName}
        </span>
      </div>

      {/* Hover Popover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-[calc(100%+16px)] z-50 flex w-[190px] flex-col items-center rounded-2xl border border-slate-100/50 bg-white/95 p-4 shadow-2xl backdrop-blur-md"
            style={{ pointerEvents: 'auto' }}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={userName}
                className="mb-2 h-16 w-16 rounded-full border-2 border-white bg-slate-50 object-cover shadow-sm"
              />
            ) : (
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-xs text-slate-400">
                🌳
              </div>
            )}
            <div className="text-base font-bold tracking-tight text-slate-800">{userName}</div>
            {position && (
              <div className="mb-1 text-[11px] font-semibold text-[#689f38]">{position}</div>
            )}
            <div className="mb-3 min-h-[32px] w-full break-keep text-center text-xs leading-snug text-slate-500">
              {userDetail || '한 줄 소개가 없습니다.'}
            </div>
            <div
              className="flex w-full justify-center gap-3 transition-opacity"
              onClick={(e) => e.stopPropagation()}
            >
              {!!githubId && (
                <IconButton
                  icon={<GitHubLogoIcon className="h-5 w-5 text-slate-700 transition-colors hover:text-black" />}
                  onClick={handleGithubClick}
                />
              )}
              {!!instagramId && (
                <IconButton
                  icon={<InstagramLogoIcon className="h-5 w-5 text-slate-700 transition-colors hover:text-black" />}
                  onClick={handleInstagramClick}
                />
              )}
            </div>
            <div className="absolute -bottom-2 h-4 w-4 rotate-45 border-b border-r border-slate-100/50 bg-white/95 backdrop-blur-md" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
