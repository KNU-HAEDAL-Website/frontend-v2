import { motion } from 'framer-motion'
import type { Difficulty } from '@/hooks/useMemoryGame'

interface DifficultySelectorProps {
  onSelect: (difficulty: Difficulty) => void
  onCancel: () => void
}

const DIFFICULTIES: { key: Difficulty; label: string; pairs: number; emoji: string }[] = [
  { key: 'easy', label: '쉬움', pairs: 6, emoji: '🃏' },
  { key: 'normal', label: '보통', pairs: 8, emoji: '🎴' },
  { key: 'hard', label: '어려움', pairs: 10, emoji: '🀄' },
]

export const DifficultySelector = ({
  onSelect,
  onCancel,
}: DifficultySelectorProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mx-4 w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <h2 className="mb-1 text-center text-xl font-black text-slate-800">
          🃏 메모리 카드 게임
        </h2>
        <p className="mb-6 text-center text-sm text-slate-500">
          난이도를 선택하세요
        </p>

        <div className="flex flex-col gap-3">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.key}
              onClick={() => onSelect(d.key)}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-3.5 transition-all hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-sm active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{d.emoji}</span>
                <div className="text-left">
                  <div className="font-bold text-slate-800">{d.label}</div>
                  <div className="text-xs text-slate-400">
                    {d.pairs}쌍 · {d.pairs * 2}장
                  </div>
                </div>
              </div>
              <span className="text-sm text-slate-400">→</span>
            </button>
          ))}
        </div>

        <button
          onClick={onCancel}
          className="mt-4 w-full rounded-lg py-2 text-center text-sm text-slate-400 transition-colors hover:text-slate-600"
        >
          취소
        </button>
      </motion.div>
    </motion.div>
  )
}
