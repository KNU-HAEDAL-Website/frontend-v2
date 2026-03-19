import type { GameCard, HandResult } from '@/types/poker'
import { CardSlot } from './CardSlot'

interface PlayerBoardProps {
  slots: (GameCard | null)[]
  handResult: HandResult | null
  hasSelected: boolean
  onSlotClick: (index: number) => void
  onRemove: (index: number) => void
}

export const PlayerBoard = ({
  slots,
  handResult,
  hasSelected,
  onSlotClick,
  onRemove,
}: PlayerBoardProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Hand result preview */}
      {handResult && (
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <span
              className="text-base font-black text-[#00d1ff] sm:text-lg"
              style={{ textShadow: '0 0 12px rgba(0,209,255,0.4)' }}
            >
              {handResult.displayName}
            </span>
            <div className="flex items-center gap-2 text-[11px]">
              <span className="text-[#00d1ff]">
                {handResult.totalChips} chips
              </span>
              <span className="text-[#8f85ad]">×</span>
              <span className="text-[#ff4ecd]">
                {handResult.totalMult} mult
              </span>
              <span className="text-[#8f85ad]">=</span>
              <span
                className="font-bold text-[#f7d354]"
                style={{ textShadow: '0 0 6px rgba(247,211,84,0.3)' }}
              >
                {handResult.finalScore}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Player label */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#00d1ff]/40" />
        <span
          className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00d1ff]"
          style={{ textShadow: '0 0 8px rgba(0,209,255,0.3)' }}
        >
          YOUR HAND
        </span>
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#00d1ff]/40" />
      </div>

      {/* Player slots */}
      <div className="flex items-end gap-2 sm:gap-3">
        {slots.map((card, i) => (
          <CardSlot
            key={`player-${i}`}
            index={i}
            card={card}
            isActive={hasSelected && card === null}
            onClick={() => (card ? onRemove(i) : onSlotClick(i))}
            onRemove={() => onRemove(i)}
          />
        ))}
      </div>
    </div>
  )
}
