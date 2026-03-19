import { motion } from 'framer-motion'

/**
 * 숲 배경에 깔리는 풀, 꽃, 덤불, 구름 등 장식 요소
 */
export const LandscapeBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {/* ── Sky gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#d4edfc] via-[#bde0f6] to-[#a8d8a8]" />

      {/* ── Clouds ── */}
      <Cloud top={30} left={-150} size={1} duration={110} />
      <Cloud top={60} left={-300} size={0.7} duration={140} />
      <Cloud top={15} left={-450} size={0.85} duration={125} />

      {/* ── Far distant trees (decorative, non-interactive) ── */}
      <div className="absolute bottom-[32%] left-0 right-0 flex items-end justify-around opacity-60">
        {Array.from({ length: 14 }).map((_, i) => (
          <motion.div
            key={`bg-tree-${i}`}
            className="origin-bottom"
            animate={{ rotate: [-0.8, 0.8, -0.8] }}
            transition={{ duration: 5 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          >
            <svg width={30 + (i % 3) * 10} height={50 + (i % 3) * 15} viewBox="0 0 60 90" xmlns="http://www.w3.org/2000/svg">
              <rect x="28" y="55" width="4" height="35" fill="#8b6d4a" />
              <circle cx="30" cy="35" r={22 + (i % 3) * 4} fill={['#4a8c3f', '#3d7a35', '#5a9e4a'][i % 3]} />
              <circle cx="20" cy="40" r={14 + (i % 2) * 3} fill={['#5ca631', '#4d9426', '#68b33a'][i % 3]} />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ── Rolling hills ── */}
      <div className="absolute bottom-0 left-[-10%] h-[45%] w-[130%] rounded-t-[50%] bg-[#7bc74b] opacity-70" />
      <div className="absolute bottom-[-3%] left-[-15%] h-[38%] w-[80%] rounded-t-[50%] bg-[#6db83e]" />
      <div className="absolute bottom-[-5%] right-[-15%] h-[40%] w-[75%] rounded-t-[50%] bg-[#5daa32]" />
      <div className="absolute bottom-0 left-0 h-[18%] w-full bg-[#5ca631]" />

      {/* ── Bushes scattered across the hills ── */}
      <Bush left="5%" bottom="16%" size={1.3} color="#4a9028" />
      <Bush left="15%" bottom="18%" size={0.9} color="#60b830" />
      <Bush left="28%" bottom="14%" size={1.1} color="#4fa52c" />
      <Bush left="50%" bottom="17%" size={1.5} color="#54a82e" />
      <Bush left="65%" bottom="15%" size={0.8} color="#3d8a22" />
      <Bush left="78%" bottom="19%" size={1.2} color="#5ab032" />
      <Bush left="90%" bottom="16%" size={1.0} color="#479828" />

      {/* ── Flowers ── */}
      <Flower left="8%" bottom="18%" size={1} delay={0} />
      <Flower left="22%" bottom="16%" size={0.8} delay={1} />
      <Flower left="35%" bottom="20%" size={1.1} delay={0.5} />
      <Flower left="48%" bottom="15%" size={0.9} delay={2} />
      <Flower left="58%" bottom="19%" size={1.2} delay={1.5} />
      <Flower left="72%" bottom="17%" size={0.7} delay={0.8} />
      <Flower left="85%" bottom="21%" size={1.0} delay={1.2} />
      <Flower left="92%" bottom="18%" size={0.6} delay={2.5} />
      <Flower left="3%" bottom="22%" size={0.5} delay={3} />
      <Flower left="42%" bottom="22%" size={0.65} delay={1.8} />

      {/* ── Small grass tufts ── */}
      {Array.from({ length: 20 }).map((_, i) => (
        <GrassTuft
          key={`grass-${i}`}
          left={`${5 + (i * 4.7) % 90}%`}
          bottom={`${14 + (i * 2.3) % 10}%`}
          delay={i * 0.2}
        />
      ))}

      {/* ── Floating leaves ── */}
      <motion.div
        className="absolute left-[80%] top-[20%] h-3 w-3 rounded-full rounded-tl-none bg-[#aee25c] opacity-50"
        animate={{ x: [-50, -700], y: [-30, 60, -20], rotate: [0, 360] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute left-[60%] top-[30%] h-2.5 w-2.5 rounded-full rounded-tl-none bg-[#8bc34a] opacity-60"
        animate={{ x: [-30, -500], y: [-20, 40, -30], rotate: [0, -360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 3 }}
      />
      <motion.div
        className="absolute left-[90%] top-[15%] h-2 w-2 rounded-full rounded-tl-none bg-[#c8e96e] opacity-45"
        animate={{ x: [0, -600], y: [0, 50, -10], rotate: [0, 270] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear', delay: 7 }}
      />
    </div>
  )
}

/* ── Sub-components ── */

const Cloud = ({ top, left, size, duration }: { top: number; left: number; size: number; duration: number }) => (
  <motion.div
    className="absolute"
    style={{ top, left, transform: `scale(${size})` }}
    animate={{ x: [0, 2400] }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    <svg width="220" height="100" viewBox="0 0 220 100" fill="white" xmlns="http://www.w3.org/2000/svg">
      <circle cx="70" cy="50" r="35" opacity="0.9" />
      <circle cx="115" cy="40" r="45" opacity="0.95" />
      <circle cx="160" cy="50" r="35" opacity="0.9" />
      <rect x="70" y="50" width="90" height="35" rx="17" opacity="0.92" />
    </svg>
  </motion.div>
)

const Bush = ({
  left,
  bottom,
  size,
  color,
}: {
  left: string
  bottom: string
  size: number
  color: string
}) => (
  <div
    className="absolute"
    style={{ left, bottom, transform: `scale(${size})`, transformOrigin: 'bottom center' }}
  >
    <svg width="60" height="35" viewBox="0 0 60 35" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="30" cy="22" rx="28" ry="13" fill={color} />
      <ellipse cx="18" cy="18" rx="16" ry="12" fill={color} opacity="0.85" />
      <ellipse cx="42" cy="19" rx="15" ry="11" fill={color} opacity="0.85" />
      <circle cx="25" cy="15" r="2" fill="#fff" opacity="0.3" />
      <circle cx="38" cy="16" r="1.5" fill="#fff" opacity="0.25" />
    </svg>
  </div>
)

const Flower = ({
  left,
  bottom,
  size,
  delay,
}: {
  left: string
  bottom: string
  size: number
  delay: number
}) => (
  <motion.div
    className="absolute"
    style={{ left, bottom, transform: `scale(${size})`, transformOrigin: 'bottom center' }}
    animate={{ rotate: [-2, 2, -2] }}
    transition={{ duration: 3, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width="20" height="36" viewBox="0 0 20 36" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="36" x2="10" y2="14" stroke="#5a9a2e" strokeWidth="1.5" />
      {/* leaves on stem */}
      <ellipse cx="7" cy="24" rx="3" ry="1.5" fill="#6db83e" transform="rotate(-30 7 24)" />
      <ellipse cx="13" cy="28" rx="3" ry="1.5" fill="#6db83e" transform="rotate(30 13 28)" />
      {/* petals */}
      <circle cx="10" cy="10" r="4" fill="white" />
      <circle cx="6" cy="7" r="3.5" fill="white" />
      <circle cx="14" cy="7" r="3.5" fill="white" />
      <circle cx="7" cy="13" r="3.5" fill="white" />
      <circle cx="13" cy="13" r="3.5" fill="white" />
      {/* center */}
      <circle cx="10" cy="10" r="2.5" fill="#f5b731" />
    </svg>
  </motion.div>
)

const GrassTuft = ({
  left,
  bottom,
  delay,
}: {
  left: string
  bottom: string
  delay: number
}) => (
  <motion.div
    className="absolute"
    style={{ left, bottom, transformOrigin: 'bottom center' }}
    animate={{ rotate: [-1.5, 1.5, -1.5] }}
    transition={{ duration: 2.5, delay, repeat: Infinity, ease: 'easeInOut' }}
  >
    <svg width="12" height="16" viewBox="0 0 12 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 16 Q4 8 2 0" stroke="#4a9028" strokeWidth="1.2" fill="none" />
      <path d="M6 16 Q6 7 6 1" stroke="#5ab032" strokeWidth="1.2" fill="none" />
      <path d="M6 16 Q8 8 10 0" stroke="#4a9028" strokeWidth="1.2" fill="none" />
    </svg>
  </motion.div>
)
