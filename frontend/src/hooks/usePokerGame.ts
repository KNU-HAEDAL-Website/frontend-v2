import { useState, useCallback, useMemo } from 'react'
import type { GameCard, GameState, GamePhase } from '@/types/poker'
import { evaluateHand } from '@/lib/poker'

const INITIAL_TARGET = 300

export function usePokerGame(
  allPlayerCards: GameCard[],
  opponentCards: GameCard[],
) {
  const [round, setRound] = useState(1)
  const [phase, setPhase] = useState<GamePhase>('SELECTING')
  const [playerSlots, setPlayerSlots] = useState<(GameCard | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ])
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)
  const [playerScore, setPlayerScore] = useState(0)
  const [winner, setWinner] = useState<'player' | 'opponent' | 'draw' | null>(
    null,
  )

  // Shuffle and deal 8 cards from the pool each round
  const playerHand = useMemo(() => {
    const shuffled = [...allPlayerCards].sort(
      (a, b) =>
        Math.sin(a.id.length * round * 9301) -
        Math.sin(b.id.length * round * 4927),
    )
    return shuffled.slice(0, Math.min(8, shuffled.length))
  }, [allPlayerCards, round])

  // Opponent always uses their 5 best cards (or however many admins there are)
  const opponentSlots = useMemo(() => {
    return opponentCards.slice(0, 5)
  }, [opponentCards])

  const targetScore = INITIAL_TARGET * round

  // Evaluate hands in real time
  const playerHandResult = useMemo(
    () => evaluateHand(playerSlots),
    [playerSlots],
  )
  const opponentHandResult = useMemo(
    () => evaluateHand(opponentSlots),
    [opponentSlots],
  )

  const opponentScore = opponentHandResult?.finalScore ?? 0

  // Cards available in hand (not yet placed)
  const availableHand = useMemo(() => {
    const placedIds = new Set(
      playerSlots.filter((s): s is GameCard => s !== null).map((c) => c.id),
    )
    return playerHand.filter((c) => !placedIds.has(c.id))
  }, [playerHand, playerSlots])

  const selectCard = useCallback(
    (cardId: string) => {
      if (phase !== 'SELECTING') return
      setSelectedCardId((prev) => (prev === cardId ? null : cardId))
    },
    [phase],
  )

  const placeCard = useCallback(
    (slotIndex: number) => {
      if (phase !== 'SELECTING' || !selectedCardId) return

      const card =
        playerHand.find((c) => c.id === selectedCardId) ??
        playerSlots.find(
          (c): c is GameCard => c !== null && c.id === selectedCardId,
        )
      if (!card) return

      setPlayerSlots((prev) => {
        const next = [...prev]
        // If card is already in another slot, remove it
        const existingIdx = next.findIndex(
          (c) => c !== null && c.id === card.id,
        )
        if (existingIdx !== -1) next[existingIdx] = null
        // If target slot is occupied, swap back to hand
        next[slotIndex] = card
        return next
      })
      setSelectedCardId(null)
    },
    [phase, selectedCardId, playerHand, playerSlots],
  )

  const removeFromSlot = useCallback(
    (slotIndex: number) => {
      if (phase !== 'SELECTING') return
      setPlayerSlots((prev) => {
        const next = [...prev]
        next[slotIndex] = null
        return next
      })
    },
    [phase],
  )

  const playHand = useCallback(() => {
    if (phase !== 'SELECTING') return
    const filledCount = playerSlots.filter((s) => s !== null).length
    if (filledCount === 0) return

    setPhase('SCORING')

    // After a delay, show result
    setTimeout(() => {
      const pScore = playerHandResult?.finalScore ?? 0
      setPlayerScore(pScore)

      if (pScore > opponentScore) {
        setWinner('player')
      } else if (pScore < opponentScore) {
        setWinner('opponent')
      } else {
        setWinner('draw')
      }
      setPhase('RESULT')
    }, 2000)
  }, [phase, playerSlots, playerHandResult, opponentScore])

  const nextRound = useCallback(() => {
    setRound((r) => r + 1)
    setPhase('SELECTING')
    setPlayerSlots([null, null, null, null, null])
    setSelectedCardId(null)
    setPlayerScore(0)
    setWinner(null)
  }, [])

  const resetGame = useCallback(() => {
    setRound(1)
    setPhase('SELECTING')
    setPlayerSlots([null, null, null, null, null])
    setSelectedCardId(null)
    setPlayerScore(0)
    setWinner(null)
  }, [])

  const state: GameState = {
    round,
    targetScore,
    playerScore,
    opponentScore,
    phase,
    playerHand: availableHand,
    playerSlots,
    opponentSlots,
    selectedCardId,
    playerHandResult,
    opponentHandResult,
    winner,
  }

  return {
    state,
    selectCard,
    placeCard,
    removeFromSlot,
    playHand,
    nextRound,
    resetGame,
  }
}
