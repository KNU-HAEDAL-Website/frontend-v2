import { motion } from 'framer-motion'

interface ResultModalProps {
  matchedPairs: number
  totalPairs: number
  attempts: number
  elapsedSeconds: number
  onPlayAgain: () => void
  onBackToList: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export const ResultModal = ({
  matchedPairs,
  totalPairs,
  attempts,
  elapsedSeconds,
  onPlayAgain,
  onBackToList,
}: ResultModalProps) => {
  const efficiency = attempts > 0 ? Math.round((matchedPairs / attempts) * 100) : 0
  const stars = efficiency >= 80 ? 3 : efficiency >= 50 ? 2 : 1

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mx-4 w-full max-w-sm rounded-2xl border border-amber-200 bg-white p-6 shadow-2xl"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        {/* Stars */}
        <div className="mb-2 flex justify-center gap-1">
          {[1, 2, 3].map((i) => (
            <motion.span
              key={i}
              className={`text-3xl ${i <= stars ? '' : 'opacity-20 grayscale'}`}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1 * i, type: 'spring' }}
            >
              ⭐
            </motion.span>
          ))}
        </div>

        <h2 className="mb-1 text-center text-xl font-black text-slate-800">
          게임 완료! 🎉
        </h2>
        <p className="mb-5 text-center text-sm text-slate-500">
          모든 카드를 맞췄습니다
        </p>

        {/* Stats grid */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-indigo-50 px-3 py-3">
            <span className="text-[10px] font-semibold uppercase text-indigo-400">
              맞춘 쌍
            </span>
            <span className="text-xl font-black text-indigo-600">
              {matchedPairs}/{totalPairs}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-amber-50 px-3 py-3">
            <span className="text-[10px] font-semibold uppercase text-amber-400">
              시도
            </span>
            <span className="text-xl font-black text-amber-600">
              {attempts}
            </span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-slate-50 px-3 py-3">
            <span className="text-[10px] font-semibold uppercase text-slate-400">
              시간
            </span>
            <span className="font-mono text-xl font-black text-slate-700">
              {formatTime(elapsedSeconds)}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onBackToList}
            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition-all hover:bg-slate-50"
          >
            목록으로
          </button>
          <button
            onClick={onPlayAgain}
            className="flex-1 rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-indigo-700 hover:shadow-lg"
          >
            다시 하기
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
