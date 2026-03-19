import { motion } from 'framer-motion'
import type { GameCard } from '@/types/poker'

interface GameMemberCardProps {
  card: GameCard
  isSelected?: boolean
  isScoring?: boolean
  isOpponent?: boolean
  onClick?: () => void
  compact?: boolean
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

const RANK_DISPLAY: Record<number, string> = {
  1: 'A',
  11: 'J',
  12: 'Q',
  13: 'K',
}

const RARITY_STYLES: Record<
  GameCard['rarity'],
  { border: string; glow: string; bg: string; label: string }
> = {
  common: {
    border: 'border-[#3a3450]/80',
    glow: '',
    bg: 'bg-[#1c1628]',
    label: 'COMMON',
  },
  rare: {
    border: 'border-[#7c5cff]/60',
    glow: 'shadow-[0_0_12px_rgba(124,92,255,0.3)]',
    bg: 'bg-[#1a1530]',
    label: 'RARE',
  },
  epic: {
    border: 'border-[#ff4ecd]/50',
    glow: 'shadow-[0_0_18px_rgba(255,78,205,0.3)]',
    bg: 'bg-[#1e1228]',
    label: 'EPIC',
  },
  legendary: {
    border: 'border-[#f7d354]/50',
    glow: 'shadow-[0_0_24px_rgba(247,211,84,0.35)]',
    bg: 'bg-[#1f1820]',
    label: 'LEGENDARY',
  },
}

const RARITY_LABEL_COLORS: Record<GameCard['rarity'], string> = {
  common: 'text-[#8f85ad]',
  rare: 'text-[#7c5cff]',
  epic: 'text-[#ff4ecd]',
  legendary: 'text-[#f7d354]',
}

export const GameMemberCard = ({
  card,
  isSelected = false,
  isScoring = false,
  isOpponent = false,
  onClick,
  compact = false,
}: GameMemberCardProps) => {
  const rankStr = RANK_DISPLAY[card.rank] || String(card.rank)
  const suitSymbol = SUIT_SYMBOLS[card.suit]
  const suitColor = SUIT_COLORS[card.suit]
  const rStyle = RARITY_STYLES[card.rarity]

  const w = compact ? 'w-[100px]' : 'w-[130px] sm:w-[145px]'
  const h = compact ? 'h-[140px]' : 'h-[190px] sm:h-[210px]'

  return (
    <motion.div
      className={`
        relative cursor-pointer select-none rounded-xl border-2
        ${rStyle.border} ${rStyle.bg} ${rStyle.glow}
        ${w} ${h}
        flex flex-col overflow-hidden transition-colors
        ${isSelected ? 'border-[#00d1ff] shadow-[0_0_20px_rgba(0,209,255,0.4)]' : ''}
        ${isScoring ? 'border-[#f7d354] shadow-[0_0_25px_rgba(247,211,84,0.5)]' : ''}
      `}
      onClick={onClick}
      whileHover={
        !isOpponent
          ? { y: -8, scale: 1.04, transition: { duration: 0.15 } }
          : undefined
      }
      whileTap={!isOpponent ? { scale: 0.97 } : undefined}
      layout
    >
      {/* Holographic shimmer for legendary */}
      {card.rarity === 'legendary' && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10 rounded-xl opacity-20"
          style={{
            background:
              'linear-gradient(115deg, transparent 20%, rgba(247,211,84,0.3) 40%, rgba(255,78,205,0.2) 60%, transparent 80%)',
          }}
          animate={{ x: [-200, 200] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'reverse',
          }}
        />
      )}

      {/* Top - Rank & Suit */}
      <div className="flex items-start justify-between px-2 pt-1.5">
        <div className="flex flex-col items-center leading-none">
          <span
            className="text-lg font-black sm:text-xl"
            style={{ color: suitColor, textShadow: `0 0 8px ${suitColor}40` }}
          >
            {rankStr}
          </span>
          <span className="text-xs sm:text-sm" style={{ color: suitColor }}>
            {suitSymbol}
          </span>
        </div>
        <div
          className={`mt-1 rounded px-1 py-0.5 text-[7px] font-bold tracking-wider ${RARITY_LABEL_COLORS[card.rarity]}`}
          style={{
            background: 'rgba(255,255,255,0.05)',
            letterSpacing: '0.1em',
          }}
        >
          {rStyle.label}
        </div>
      </div>

      {/* Center - Avatar area */}
      <div className="relative mx-auto flex flex-1 items-center justify-center px-2">
        <div
          className="flex items-center justify-center overflow-hidden rounded-lg border border-white/10"
          style={{
            width: compact ? 50 : 70,
            height: compact ? 50 : 70,
            background: '#0b0912',
          }}
        >
          {card.profileImageUrl ? (
            <img
              src={
                card.profileImageUrl.startsWith('https')
                  ? card.profileImageUrl
                  : card.profileImageUrl
              }
              alt={card.userName}
              className="h-full w-full object-cover"
              style={{
                filter:
                  'contrast(1.3) saturate(0.6) brightness(0.8) hue-rotate(240deg)',
              }}
            />
          ) : (
            <span
              className="text-2xl font-black sm:text-3xl"
              style={{ color: suitColor }}
            >
              {suitSymbol}
            </span>
          )}
        </div>
      </div>

      {/* Bottom - Info */}
      <div className="px-2 pb-2">
        <div className="truncate text-center text-xs font-bold text-[#f4f1ff] sm:text-sm">
          {card.userName}
        </div>
        {card.position && (
          <div className="truncate text-center text-[9px] font-semibold text-[#7c5cff] sm:text-[10px]">
            {card.position}
          </div>
        )}
        {!compact && (
          <div className="mt-1 flex items-center justify-center gap-2 text-[9px] text-[#8f85ad]">
            <span>
              +{card.chipBonus}
              <span className="text-[#00d1ff]">칩</span>
            </span>
            <span>
              +{card.multBonus}
              <span className="text-[#ff4ecd]">배수</span>
            </span>
          </div>
        )}
      </div>

      {/* Bottom rank mirror */}
      <div className="absolute bottom-1 right-2 rotate-180">
        <span
          className="text-xs font-black opacity-40"
          style={{ color: suitColor }}
        >
          {rankStr}
        </span>
      </div>
    </motion.div>
  )
}
