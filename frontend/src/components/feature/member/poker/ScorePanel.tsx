import { motion, AnimatePresence } from 'framer-motion'
import type { GameState } from '@/types/poker'

interface ScorePanelProps {
  state: GameState
  onPlayHand: () => void
  onNextRound: () => void
}

export const ScorePanel = ({
  state,
  onPlayHand,
  onNextRound,
}: ScorePanelProps) => {
  const filledSlots = state.playerSlots.filter((s) => s !== null).length
  const canPlay = filledSlots > 0 && state.phase === 'SELECTING'

  return (
    <div className="relative z-20 flex flex-col items-center gap-4">
      {/* Score display area */}
      <AnimatePresence mode="wait">
        {state.phase === 'SCORING' && state.playerHandResult && (
          <motion.div
            key="scoring"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center gap-2"
          >
            <motion.span
              className="text-2xl font-black text-[#f7d354] sm:text-3xl"
              style={{ textShadow: '0 0 20px rgba(247,211,84,0.5)' }}
              initial={{ scale: 0.5 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6 }}
            >
              {state.playerHandResult.displayName}
            </motion.span>

            {/* Score cascade animation */}
            <div className="flex items-center gap-3 text-lg font-bold">
              <motion.span
                className="text-[#00d1ff]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                {state.playerHandResult.totalChips}
              </motion.span>
              <motion.span
                className="text-[#8f85ad]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                ×
              </motion.span>
              <motion.span
                className="text-[#ff4ecd]"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                {state.playerHandResult.totalMult}
              </motion.span>
            </div>

            <motion.span
              className="mt-1 text-3xl font-black text-[#f7d354] sm:text-4xl"
              style={{ textShadow: '0 0 25px rgba(247,211,84,0.5)' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: [1, 1.15, 1] }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {state.playerHandResult.finalScore}
            </motion.span>
          </motion.div>
        )}

        {state.phase === 'RESULT' && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Winner announcement */}
            <motion.div
              className={`rounded-xl px-8 py-4 text-center ${
                state.winner === 'player'
                  ? 'bg-[#f7d354]/10 shadow-[0_0_40px_rgba(247,211,84,0.3)]'
                  : state.winner === 'opponent'
                    ? 'bg-[#ff4ecd]/10 shadow-[0_0_40px_rgba(255,78,205,0.3)]'
                    : 'bg-[#7c5cff]/10'
              }`}
              animate={
                state.winner === 'player'
                  ? { boxShadow: ['0 0 20px rgba(247,211,84,0.2)', '0 0 50px rgba(247,211,84,0.4)', '0 0 20px rgba(247,211,84,0.2)'] }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <span
                className={`text-3xl font-black sm:text-4xl ${
                  state.winner === 'player'
                    ? 'text-[#f7d354]'
                    : state.winner === 'opponent'
                      ? 'text-[#ff4ecd]'
                      : 'text-[#7c5cff]'
                }`}
                style={{
                  textShadow: `0 0 20px ${state.winner === 'player' ? 'rgba(247,211,84,0.5)' : state.winner === 'opponent' ? 'rgba(255,78,205,0.5)' : 'rgba(124,92,255,0.5)'}`,
                }}
              >
                {state.winner === 'player'
                  ? '★ VICTORY ★'
                  : state.winner === 'opponent'
                    ? 'DEFEAT'
                    : 'DRAW'}
              </span>
            </motion.div>

            {/* Score comparison */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-wider text-[#8f85ad]">
                  YOU
                </span>
                <span className="text-lg font-black text-[#00d1ff]">
                  {state.playerScore}
                </span>
              </div>
              <span className="text-[#8f85ad]">vs</span>
              <div className="flex flex-col items-center">
                <span className="text-[9px] uppercase tracking-wider text-[#8f85ad]">
                  해구르르
                </span>
                <span className="text-lg font-black text-[#ff4ecd]">
                  {state.opponentScore}
                </span>
              </div>
            </div>

            <button
              onClick={onNextRound}
              className="mt-2 rounded-lg bg-[#7c5cff] px-6 py-2 text-sm font-bold text-white shadow-[0_0_15px_rgba(124,92,255,0.4)] transition-all hover:bg-[#8d6fff] hover:shadow-[0_0_25px_rgba(124,92,255,0.5)]"
            >
              NEXT ROUND →
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play button */}
      {state.phase === 'SELECTING' && (
        <motion.button
          onClick={onPlayHand}
          disabled={!canPlay}
          className={`
            rounded-xl px-8 py-3 text-sm font-black uppercase tracking-wider transition-all
            ${
              canPlay
                ? 'bg-gradient-to-r from-[#7c5cff] to-[#ff4ecd] text-white shadow-[0_0_20px_rgba(124,92,255,0.4)] hover:shadow-[0_0_35px_rgba(124,92,255,0.6)]'
                : 'cursor-not-allowed bg-[#1c1628] text-[#3a3450]'
            }
          `}
          whileHover={canPlay ? { scale: 1.05 } : undefined}
          whileTap={canPlay ? { scale: 0.95 } : undefined}
        >
          {filledSlots === 0
            ? 'SELECT CARDS'
            : `PLAY HAND (${filledSlots}/5)`}
        </motion.button>
      )}
    </div>
  )
}
