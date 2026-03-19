import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'
import type { GameCard } from '@/types/poker'
import { BASE_URL } from '@/service/config'

interface CardDetailPanelProps {
  card: GameCard | null
}

const SUIT_SYMBOLS: Record<GameCard['suit'], string> = {
  spades: '♠',
  hearts: '♥',
  diamonds: '♦',
  clubs: '♣',
}

const SUIT_COLORS: Record<GameCard['suit'], string> = {
  spades: '#c7bfe3',
  hearts: '#ff4ecd',
  diamonds: '#00d1ff',
  clubs: '#7dff72',
}

const RARITY_COLORS: Record<GameCard['rarity'], string> = {
  common: '#8f85ad',
  rare: '#7c5cff',
  epic: '#ff4ecd',
  legendary: '#f7d354',
}

const RANK_DISPLAY: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
}

export const CardDetailPanel = ({ card }: CardDetailPanelProps) => {
  return (
    <div className="flex h-full w-[240px] flex-col border-l border-[#3a3450]/40 bg-[#15111f]/80 backdrop-blur-sm">
      <AnimatePresence mode="wait">
        {card ? (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-4 p-5"
          >
            {/* Avatar */}
            <div className="flex justify-center">
              <div
                className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border-2"
                style={{
                  borderColor: RARITY_COLORS[card.rarity],
                  boxShadow: `0 0 20px ${RARITY_COLORS[card.rarity]}30`,
                  background: '#0b0912',
                }}
              >
                {card.profileImageUrl ? (
                  <img
                    src={
                      card.profileImageUrl.startsWith('https')
                        ? card.profileImageUrl
                        : `${BASE_URL}${card.profileImageUrl}`
                    }
                    alt={card.userName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span
                    className="text-4xl font-black"
                    style={{ color: SUIT_COLORS[card.suit] }}
                  >
                    {SUIT_SYMBOLS[card.suit]}
                  </span>
                )}
              </div>
            </div>

            {/* Name & Position */}
            <div className="text-center">
              <div className="text-lg font-black text-[#f4f1ff]">
                {card.userName}
              </div>
              {card.position && (
                <div
                  className="text-xs font-bold"
                  style={{ color: RARITY_COLORS[card.rarity] }}
                >
                  {card.position}
                </div>
              )}
            </div>

            {/* Card stats */}
            <div className="rounded-lg border border-[#3a3450]/40 bg-[#0b0912]/60 p-3">
              <div className="mb-2 text-[9px] font-bold uppercase tracking-widest text-[#8f85ad]">
                CARD STATS
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <span style={{ color: SUIT_COLORS[card.suit] }}>
                    {SUIT_SYMBOLS[card.suit]}
                  </span>
                  <span className="text-[#c7bfe3]">
                    {RANK_DISPLAY[card.rank] || card.rank}
                  </span>
                </div>
                <div>
                  <span
                    className="text-[9px] font-bold uppercase"
                    style={{ color: RARITY_COLORS[card.rarity] }}
                  >
                    {card.rarity}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#00d1ff]">+{card.chipBonus}</span>
                  <span className="text-[#8f85ad]">칩</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[#ff4ecd]">+{card.multBonus}</span>
                  <span className="text-[#8f85ad]">배수</span>
                </div>
              </div>
            </div>

            {/* Intro */}
            <div className="rounded-lg border border-[#3a3450]/40 bg-[#0b0912]/60 p-3">
              <div className="mb-1 text-[9px] font-bold uppercase tracking-widest text-[#8f85ad]">
                PROFILE
              </div>
              <p className="text-xs leading-relaxed text-[#c7bfe3]">
                {card.profileIntro || '한 줄 소개가 없습니다.'}
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-4">
              {card.githubAccount && (
                <button
                  onClick={() =>
                    window.open(
                      `https://github.com/${card.githubAccount}`,
                      '_blank',
                    )
                  }
                  className="rounded-lg border border-[#3a3450] p-2 text-[#c7bfe3] transition-all hover:border-[#7c5cff] hover:text-[#7c5cff] hover:shadow-[0_0_8px_rgba(124,92,255,0.3)]"
                >
                  <GitHubLogoIcon className="h-4 w-4" />
                </button>
              )}
              {card.instaAccount && (
                <button
                  onClick={() =>
                    window.open(
                      `https://instagram.com/${card.instaAccount}`,
                      '_blank',
                    )
                  }
                  className="rounded-lg border border-[#3a3450] p-2 text-[#c7bfe3] transition-all hover:border-[#ff4ecd] hover:text-[#ff4ecd] hover:shadow-[0_0_8px_rgba(255,78,205,0.3)]"
                >
                  <InstagramLogoIcon className="h-4 w-4" />
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-1 flex-col items-center justify-center gap-3 p-5"
          >
            <span className="text-3xl opacity-20">🃏</span>
            <span className="text-center text-[10px] leading-relaxed text-[#8f85ad]">
              카드를 선택하거나
              <br />
              hover하여 정보를 확인하세요
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
