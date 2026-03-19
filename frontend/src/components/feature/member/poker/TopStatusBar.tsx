import type { GameState } from '@/types/poker'

interface TopStatusBarProps {
  state: GameState
  onReset: () => void
}

export const TopStatusBar = ({ state, onReset }: TopStatusBarProps) => {
  return (
    <div className="relative z-20 flex w-full items-center justify-between px-4 py-3 sm:px-8">
      {/* Left: Round */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8f85ad]">
            ROUND
          </span>
          <span
            className="text-2xl font-black text-[#f7d354]"
            style={{ textShadow: '0 0 12px rgba(247,211,84,0.4)' }}
          >
            {state.round}
          </span>
        </div>
      </div>

      {/* Center: Title */}
      <div className="flex flex-col items-center">
        <span
          className="text-xs font-bold uppercase tracking-[0.3em] text-[#7c5cff] sm:text-sm"
          style={{ textShadow: '0 0 10px rgba(124,92,255,0.4)' }}
        >
          HAEDAL POKER
        </span>
        <span className="text-[9px] tracking-wider text-[#8f85ad]">
          회원 카드 배틀
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onReset}
          className="rounded-lg border border-[#3a3450] bg-[#1c1628] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#c7bfe3] transition-all hover:border-[#ff4ecd]/50 hover:text-[#ff4ecd] hover:shadow-[0_0_10px_rgba(255,78,205,0.2)]"
        >
          RESET
        </button>
      </div>
    </div>
  )
}
