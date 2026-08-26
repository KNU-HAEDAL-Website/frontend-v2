import type { ReactNode } from 'react'
import { useRef } from 'react'

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'

import { Bootcamp } from './Bootcamp'
import { Contributors } from './Contributors'
import { Hero } from './Hero'
import { Highlights } from './Highlights'
import { Join } from './Join'
import { Projects } from './Projects'
import Schedule from './Schedule'
import { Stats } from './Stats'
import { Tracks } from './Tracks'

type RevealDirection = 'up' | 'left' | 'right' | 'scale'

interface ScrollRevealProps {
  children: ReactNode
  direction?: RevealDirection
  delay?: number
  className?: string
}

const revealOffset: Record<
  RevealDirection,
  { x: number; y: number; scale: number }
> = {
  up: { x: 0, y: 72, scale: 1 },
  left: { x: -84, y: 20, scale: 1 },
  right: { x: 84, y: 20, scale: 1 },
  scale: { x: 0, y: 40, scale: 0.96 },
}

const revealEase = [0.22, 1, 0.36, 1] as const

function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion()
  const offset = revealOffset[direction]

  return (
    <motion.div
      className={`scroll-reveal ${className}`.trim()}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              filter: 'blur(10px)',
              x: offset.x,
              y: offset.y,
              scale: offset.scale,
            }
      }
      whileInView={{
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        y: 0,
        scale: 1,
      }}
      viewport={{ once: true, amount: 0.16, margin: '0px 0px -8% 0px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.85,
        delay: shouldReduceMotion ? 0 : delay,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  )
}

export const RecruitHome = () => {
  const homeRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: homeRef,
    offset: ['start start', 'end end'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.25,
  })

  return (
    <div className="home" ref={homeRef}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard-dynamic-subset.min.css');

        .home {
          --content-max: 107.5rem;
          --font-site: 'Pretendard', sans-serif;
          --page-gutter: clamp(1.5rem, 4vw, 4.5rem);
          width: 100%;
        }

        .home .home__sections,
        .home .home__sections * {
          font-family: 'Pretendard', sans-serif;
        }

        .home__scrollProgress {
          position: fixed;
          top: 4rem;
          right: 0;
          left: 0;
          z-index: 40;
          height: 3px;
          background: linear-gradient(90deg, #00b4d8, #90e0ef, #caf0f8);
          box-shadow: 0 0 14px rgba(0, 180, 216, 0.55);
          pointer-events: none;
          transform-origin: 0 50%;
        }

        .scroll-reveal {
          position: relative;
          width: 100%;
        }

        .home__heroReveal {
          background: #03045e;
        }

        .home__sections {
          display: flex;
          flex-direction: column;
          gap: clamp(7rem, 10vw, 12rem);
          padding: clamp(7rem, 10vw, 12rem)
            clamp(1.5rem, 7vw, 8rem);
          background: #ffffff;
        }

        .home__sections > .scroll-reveal {
          width: min(100%, 80rem);
          margin-inline: auto;
        }

        .home__sections > .scroll-reveal > section {
          width: 100%;
          min-height: auto;
          border: 0;
          background: #ffffff;
        }

        .home__sections .stats__inner,
        .home__sections .join__inner {
          min-height: auto;
        }

        @media (max-width: 45rem) {
          .home__sections {
            gap: clamp(4.5rem, 18vw, 7rem);
            padding: clamp(4.5rem, 18vw, 7rem) 1rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home__scrollProgress {
            display: none;
          }
        }
      `}</style>
      {!shouldReduceMotion && (
        <motion.div
          className="home__scrollProgress"
          style={{ scaleX: smoothProgress }}
          aria-hidden="true"
        />
      )}

      <ScrollReveal direction="scale" className="home__heroReveal">
        <Hero />
      </ScrollReveal>

      <div className="home__sections">
        <ScrollReveal direction="up">
          <Stats />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <Bootcamp />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <Tracks />
        </ScrollReveal>
        <ScrollReveal direction="scale">
          <Projects />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <Highlights />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <Schedule />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Join />
        </ScrollReveal>
        <ScrollReveal direction="scale">
          <Contributors />
        </ScrollReveal>
      </div>
    </div>
  )
}
