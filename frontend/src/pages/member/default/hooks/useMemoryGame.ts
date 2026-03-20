import { useCallback, useEffect, useRef, useState } from 'react'

const PAIR_COUNT = 6

export interface MemoryCardData {
  id: string
  pairId: string
  userName: string
  userImageUrl?: string
  userDetail?: string
  githubId?: string
  instagramId?: string
  position?: string
  rank: string
  suit: '♠' | '♥' | '♦' | '♣'
}

export type GamePhase = 'idle' | 'playing' | 'checking' | 'completed'

export interface MemoryGameState {
  phase: GamePhase
  cards: MemoryCardData[]
  flippedIds: string[]
  matchedIds: Set<string>
  attempts: number
  matchedPairs: number
  totalPairs: number
  elapsedSeconds: number
}

function shuffleArray<T>(arr: T[], seed: number): T[] {
  const result = [...arr]
  let s = seed
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']
const SUITS: MemoryCardData['suit'][] = ['♠', '♥', '♦', '♣']

interface MemberProfile {
  userId: string
  userName: string
  profileImageUrl?: string
  profileIntro?: string
  githubAccount?: string
  instaAccount?: string
  position?: string
}

export function useMemoryGame() {
  const [phase, setPhase] = useState<GamePhase>('idle')
  const [cards, setCards] = useState<MemoryCardData[]>([])
  const [flippedIds, setFlippedIds] = useState<string[]>([])
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set())
  const [attempts, setAttempts] = useState(0)
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [totalPairs, setTotalPairs] = useState(0)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (phase === 'playing' || phase === 'checking') {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((s) => s + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase])

  const startGame = useCallback((profiles: MemberProfile[]) => {
    const seed = Date.now()
    const shuffledProfiles = shuffleArray(profiles, seed)
    const selected = shuffledProfiles.slice(
      0,
      Math.min(PAIR_COUNT, shuffledProfiles.length),
    )

    const gameCards: MemoryCardData[] = []
    selected.forEach((profile, i) => {
      const pairId = `pair-${profile.userId}`
      const rank = RANKS[i % RANKS.length]
      const suit = SUITS[i % SUITS.length]

      gameCards.push({
        id: `${pairId}-a`,
        pairId,
        userName: profile.userName,
        userImageUrl: profile.profileImageUrl,
        userDetail: profile.profileIntro,
        githubId: profile.githubAccount,
        instagramId: profile.instaAccount,
        position: profile.position,
        rank,
        suit,
      })
      gameCards.push({
        id: `${pairId}-b`,
        pairId,
        userName: profile.userName,
        userImageUrl: profile.profileImageUrl,
        userDetail: profile.profileIntro,
        githubId: profile.githubAccount,
        instagramId: profile.instaAccount,
        position: profile.position,
        rank,
        suit,
      })
    })

    const shuffledCards = shuffleArray(gameCards, seed + 42)

    setCards(shuffledCards)
    setFlippedIds([])
    setMatchedIds(new Set())
    setAttempts(0)
    setMatchedPairs(0)
    setTotalPairs(selected.length)
    setElapsedSeconds(0)
    setPhase('playing')
  }, [])

  const flipCard = useCallback(
    (cardId: string) => {
      if (phase !== 'playing') return
      if (flippedIds.includes(cardId)) return
      if (matchedIds.has(cardId)) return

      const newFlipped = [...flippedIds, cardId]
      setFlippedIds(newFlipped)

      if (newFlipped.length === 2) {
        setPhase('checking')
        setAttempts((a) => a + 1)

        const [firstId, secondId] = newFlipped
        const firstCard = cards.find((c) => c.id === firstId)
        const secondCard = cards.find((c) => c.id === secondId)

        if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
          setTimeout(() => {
            setMatchedIds((prev) => {
              const next = new Set(prev)
              next.add(firstId)
              next.add(secondId)
              return next
            })
            setMatchedPairs((p) => {
              const newP = p + 1
              if (newP >= totalPairs) {
                setPhase('completed')
              } else {
                setPhase('playing')
              }
              return newP
            })
            setFlippedIds([])
          }, 600)
        } else {
          setTimeout(() => {
            setFlippedIds([])
            setPhase('playing')
          }, 1000)
        }
      }
    },
    [phase, flippedIds, matchedIds, cards, totalPairs],
  )

  const endGame = useCallback(() => {
    setPhase('idle')
    setCards([])
    setFlippedIds([])
    setMatchedIds(new Set())
    setAttempts(0)
    setMatchedPairs(0)
    setTotalPairs(0)
    setElapsedSeconds(0)
  }, [])

  const state: MemoryGameState = {
    phase,
    cards,
    flippedIds,
    matchedIds,
    attempts,
    matchedPairs,
    totalPairs,
    elapsedSeconds,
  }

  return {
    state,
    startGame,
    flipCard,
    endGame,
  }
}
