import { useMemo, useRef } from 'react'

import { motion, useScroll, useTransform } from 'framer-motion'

import { haedalLaptop } from '@/assets/images'
import { Footer, Header } from '@/components/feature'

import {
  RecruitBootCamp,
  RecruitEvent,
  RecruitHero,
  RecruitLinkButton,
  RecruitProcess,
  RecruitTrack,
} from './components'

const StarField = () => {
  const stars = useMemo(
    () =>
      Array.from({ length: 150 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 2.5 + 0.5,
        delay: `${(Math.random() * 8).toFixed(1)}s`,
        dur: `${(Math.random() * 2 + 1.5).toFixed(1)}s`,
      })),
    [],
  )

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.05; transform: scale(0.8); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
      `}</style>
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            boxShadow: `0 0 ${s.size * 2}px rgba(255,255,255,0.5)`,
            animation: `twinkle ${s.dur} ${s.delay} ease-in-out infinite`,
            willChange: 'opacity, transform',
          }}
        />
      ))}
    </div>
  )
}

export default function RecruitPage() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Background: Sun (warm) → Deep Space → Moon (cool slate)
  const bg = useTransform(
    scrollYProgress,
    [0, 0.25, 0.7, 1],
    ['#3d1200', '#150800', '#030308', '#1e293b'],
  )

  // Calculate scroll positions for the 5 stops (Sun, Gas Giant, BootCamp, Track, Moon)
  // 0.0 ~ 0.1   = Sun (Top)
  // 0.25 ~ 0.35 = Event Planet (Middle)
  // 0.50 ~ 0.60 = BootCamp Planet (Middle)
  // 0.75 ~ 0.85 = Track Planet (Middle)
  // 0.95 ~ 1.0  = Moon (Bottom)

  // Floating trajectory to "land" smoothly from top to bottom
  const astroY = useTransform(scrollYProgress, [0, 1], ['10vh', '85vh'])
  const astroRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-10, 10, -10])
  const astroScale = 1
  // Z-index stays high so Haedal is always ON TOP of the planets
  const astroZ = useTransform(scrollYProgress, [0, 1], [50, 50])

  // Dust effect opacity — peaks during the "landing" plateau phases
  const dustOpacity = useTransform(
    scrollYProgress,
    [
      0, 0.22, 0.25, 0.35, 0.38, 0.47, 0.5, 0.6, 0.63, 0.72, 0.75, 0.85, 0.88,
      0.92, 0.95, 1,
    ],
    [
      0, // Sun
      0,
      1,
      1,
      0, // Event Planet
      0,
      1,
      1,
      0, // BootCamp Planet
      0,
      1,
      1,
      0, // Track Planet
      0,
      1,
      1, // Moon
    ],
  )

  // Special yellow glow when finally landed on the Moon
  const moonGlowOpacity = useTransform(scrollYProgress, [0.92, 0.95], [0, 1])

  // Section Ambient Glows - fades in when Haedal lands on that section
  const eventGlow = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.35, 0.45],
    [0, 1, 1, 0],
  )
  const bootcampGlow = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.6, 0.7],
    [0, 1, 1, 0],
  )
  const trackGlow = useTransform(
    scrollYProgress,
    [0.65, 0.75, 0.85, 0.92],
    [0, 1, 1, 0],
  )

  return (
    <motion.main
      ref={ref}
      style={{ backgroundColor: bg }}
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden break-keep font-namum-square text-white"
    >
      <Header />
      <StarField />

      {/* Haedal Astronaut (scroll-synced) */}
      <motion.div
        className="pointer-events-none fixed right-4 sm:right-6 md:right-10"
        style={{
          top: astroY,
          rotate: astroRotate,
          scale: astroScale,
          zIndex: astroZ,
        }}
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute inset-[-40px] rounded-[50%] bg-white/20 blur-[20px]"
            style={{ opacity: dustOpacity }}
          />
          <motion.div
            className="absolute inset-[-60px] rounded-full bg-yellow-400/40 blur-[30px]"
            style={{ opacity: moonGlowOpacity }}
          />
          <div className="absolute inset-0 rounded-full bg-indigo-400/20 blur-2xl" />
          <img
            src={haedalLaptop}
            alt="Travelling Haedal"
            className="relative h-16 w-16 drop-shadow-[0_0_20px_rgba(99,102,241,0.5)] sm:h-24 sm:w-24 md:h-32 md:w-32"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-10 flex w-full flex-1 flex-col pt-16">
        <RecruitProcess />
        <div className="my-8 flex justify-center">
          <RecruitLinkButton />
        </div>

        <motion.section
          className="relative overflow-visible"
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]"
            style={{ opacity: eventGlow }}
          />
          <RecruitEvent />
        </motion.section>

        <motion.section
          className="relative overflow-visible"
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[100px]"
            style={{ opacity: bootcampGlow }}
          />
          <RecruitBootCamp />
        </motion.section>

        <motion.section
          className="relative overflow-visible"
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-500/10 blur-[100px]"
            style={{ opacity: trackGlow }}
          />
          <RecruitTrack />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <RecruitHero />
        </motion.section>

        <div className="mb-8 mt-16 flex justify-center">
          <RecruitLinkButton />
        </div>
        <div className="py-16" />
      </div>

      <div className="relative z-10">
        <Footer />
      </div>
    </motion.main>
  )
}
