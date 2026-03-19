import type { GameCard, HandResult } from '@/types/poker'
import { CardSlot } from './CardSlot'

interface OpponentBoardProps {
  slots: GameCard[]
  handResult: HandResult | null
}

export const OpponentBoard = ({ slots, handResult }: OpponentBoardProps) => {
  // Pad to 5 slots
  const paddedSlots: (GameCard | null)[] = [
    ...slots,
    ...Array(Math.max(0, 5 - slots.length)).fill(null),
  ]

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Opponent label */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#ff4ecd]/40" />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff4ecd]"
          style={{ textShadow: '0 0 8px rgba(255,78,205,0.3)' }}
        >
          ☆ 해구르르 ☆
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#ff4ecd]/40" />
      </div>

      {/* Hand result */}
      {handResult && (
        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-[#f7d354]" style={{ textShadow: '0 0 8px rgba(247,211,84,0.4)' }}>
            {handResult.displayName}
          </span>
          <span className="text-[10px] text-[#c7bfe3]">
            {handResult.finalScore} pts
          </span>
        </div>
      )}

      {/* Card slots */}
      <div className="flex items-end gap-2 sm:gap-3">
        {paddedSlots.map((card, i) => (
          <CardSlot key={`opp-${i}`} index={i} card={card} isOpponent />
        ))}
      </div>
    </div>
  )
}
