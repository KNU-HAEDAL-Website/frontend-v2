import { motion } from 'framer-motion'
import type { GameCard } from '@/types/poker'
import { GameMemberCard } from './GameMemberCard'

interface CardSlotProps {
  index: number
  card: GameCard | null
  isActive?: boolean  // currently targeted for placement
  onClick?: () => void
  onRemove?: () => void
  isOpponent?: boolean
}

export const CardSlot = ({
  index,
  card,
  isActive = false,
  onClick,
  onRemove,
  isOpponent = false,
}: CardSlotProps) => {
  return (
    <div className="relative" onClick={onClick}>
      {card ? (
        <div className="relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <GameMemberCard
              card={card}
              isOpponent={isOpponent}
              onClick={onRemove}
              compact
            />
          </motion.div>
          {/* Slot glow under card */}
          <div
            className="pointer-events-none absolute -inset-1 -z-10 rounded-xl opacity-30"
            style={{
              background:
                'radial-gradient(ellipse, rgba(124,92,255,0.4), transparent 70%)',
            }}
          />
        </div>
      ) : (
        // Empty slot
        <motion.div
          className={`
            flex h-[140px] w-[100px] cursor-pointer items-center justify-center
            rounded-xl border-2 border-dashed transition-all
            ${isActive ? 'border-[#00d1ff] bg-[#00d1ff]/5 shadow-[0_0_15px_rgba(0,209,255,0.2)]' : 'border-[#3a3450]/60 bg-[#1c1628]/40'}
          `}
          animate={
            isActive
              ? {
                  borderColor: [
                    'rgba(0,209,255,0.6)',
                    'rgba(0,209,255,0.2)',
                    'rgba(0,209,255,0.6)',
                  ],
                }
              : {}
          }
          transition={
            isActive
              ? { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              : {}
          }
          whileHover={{
            borderColor: 'rgba(0,209,255,0.5)',
            backgroundColor: 'rgba(0,209,255,0.03)',
          }}
        >
          <span className="text-2xl font-black text-[#3a3450]/40">
            {index + 1}
          </span>
        </motion.div>
      )}
    </div>
  )
}
