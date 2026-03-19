import { useRef } from 'react'
import type { GameCard } from '@/types/poker'
import { GameMemberCard } from './GameMemberCard'

interface CardHandProps {
  cards: GameCard[]
  selectedCardId: string | null
  onSelect: (cardId: string) => void
  onCardHover?: (card: GameCard | null) => void
}

export const CardHand = ({
  cards,
  selectedCardId,
  onSelect,
  onCardHover,
}: CardHandProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative w-full">
      {/* Label */}
      <div className="mb-2 flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#7c5cff]/30" />
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#8f85ad]">
          DECK · {cards.length} CARDS
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#7c5cff]/30" />
      </div>

      {/* Scrollable hand */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 pb-4 pt-2 sm:justify-center sm:gap-3 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {cards.length > 0 ? (
          cards.map((card) => (
            <div
              key={card.id}
              className="flex-shrink-0"
              onMouseEnter={() => onCardHover?.(card)}
              onMouseLeave={() => onCardHover?.(null)}
            >
              <GameMemberCard
                card={card}
                isSelected={selectedCardId === card.id}
                onClick={() => onSelect(card.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex h-[190px] items-center justify-center px-8">
            <span className="text-sm text-[#8f85ad]">
              모든 카드가 배치되었습니다
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
