import type { MemoryGameState } from '@/hooks/useMemoryGame'

interface GameHUDProps {
  state: MemoryGameState
  onEndGame: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export const GameHUD = ({ state, onEndGame }: GameHUDProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl border border-indigo-200/50 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm sm:px-6">
      {/* Stats */}
      <div className="flex items-center gap-4 sm:gap-6">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            맞춘 쌍
          </span>
          <span className="text-lg font-black text-indigo-600">
            {state.matchedPairs}
            <span className="text-sm font-normal text-slate-400">
              {' '}
              / {state.totalPairs}
            </span>
          </span>
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            시도
          </span>
          <span className="text-lg font-black text-amber-600">
            {state.attempts}
          </span>
        </div>

        <div className="h-8 w-px bg-slate-200" />

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            시간
          </span>
          <span className="font-mono text-lg font-bold text-slate-700">
            {formatTime(state.elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* End game button */}
      <button
        onClick={onEndGame}
        className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-xs font-bold text-red-600 transition-all hover:bg-red-100 hover:shadow-sm"
      >
        게임 종료
      </button>
    </div>
  )
}
