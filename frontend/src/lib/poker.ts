/**
 * Poker hand evaluation engine
 * Evaluates 5 cards into poker hands with Balatro-style scoring
 */
import type { GameCard, PokerHandName, HandResult } from '@/types/poker'

// Hand display names (Korean + English for that arcade feel)
const HAND_DISPLAY: Record<PokerHandName, string> = {
  HIGH_CARD: 'HIGH CARD',
  ONE_PAIR: 'ONE PAIR',
  TWO_PAIR: 'TWO PAIR',
  THREE_OF_A_KIND: 'THREE OF A KIND',
  STRAIGHT: 'STRAIGHT',
  FLUSH: 'FLUSH',
  FULL_HOUSE: 'FULL HOUSE',
  FOUR_OF_A_KIND: 'FOUR OF A KIND',
  STRAIGHT_FLUSH: 'STRAIGHT FLUSH',
  ROYAL_FLUSH: 'ROYAL FLUSH',
}

// Base chips and mult for each hand (Balatro-inspired values)
const HAND_VALUES: Record<PokerHandName, { chips: number; mult: number }> = {
  HIGH_CARD: { chips: 5, mult: 1 },
  ONE_PAIR: { chips: 10, mult: 2 },
  TWO_PAIR: { chips: 20, mult: 2 },
  THREE_OF_A_KIND: { chips: 30, mult: 3 },
  STRAIGHT: { chips: 30, mult: 4 },
  FLUSH: { chips: 35, mult: 4 },
  FULL_HOUSE: { chips: 40, mult: 4 },
  FOUR_OF_A_KIND: { chips: 60, mult: 7 },
  STRAIGHT_FLUSH: { chips: 100, mult: 8 },
  ROYAL_FLUSH: { chips: 100, mult: 8 },
}

/**
 * Evaluate a set of cards (up to 5) and return the best poker hand
 */
export function evaluateHand(cards: (GameCard | null)[]): HandResult | null {
  const validCards = cards.filter((c): c is GameCard => c !== null)
  if (validCards.length === 0) return null

  // Pad with nulls analysis but only evaluate what we have
  const ranks = validCards.map((c) => c.rank).sort((a, b) => a - b)
  const suits = validCards.map((c) => c.suit)

  // Count ranks
  const rankCounts = new Map<number, number>()
  for (const r of ranks) {
    rankCounts.set(r, (rankCounts.get(r) || 0) + 1)
  }
  const counts = Array.from(rankCounts.values()).sort((a, b) => b - a)

  // Check flush (all same suit)
  const isFlush = validCards.length >= 5 && suits.every((s) => s === suits[0])

  // Check straight
  const isStraight = checkStraight(ranks)

  // Check for Ace-high straight (10,J,Q,K,A)
  const isRoyal =
    isStraight &&
    ranks.includes(1) &&
    ranks.includes(10) &&
    ranks.includes(11) &&
    ranks.includes(12) &&
    ranks.includes(13)

  let handName: PokerHandName = 'HIGH_CARD'
  let scoringCards = validCards

  if (isRoyal && isFlush) {
    handName = 'ROYAL_FLUSH'
  } else if (isStraight && isFlush) {
    handName = 'STRAIGHT_FLUSH'
  } else if (counts[0] >= 4) {
    handName = 'FOUR_OF_A_KIND'
    const quadRank = findRankWithCount(rankCounts, 4)
    scoringCards = validCards.filter((c) => c.rank === quadRank)
  } else if (counts[0] >= 3 && counts[1] >= 2) {
    handName = 'FULL_HOUSE'
  } else if (isFlush) {
    handName = 'FLUSH'
  } else if (isStraight) {
    handName = 'STRAIGHT'
  } else if (counts[0] >= 3) {
    handName = 'THREE_OF_A_KIND'
    const tripRank = findRankWithCount(rankCounts, 3)
    scoringCards = validCards.filter((c) => c.rank === tripRank)
  } else if (counts[0] >= 2 && counts[1] >= 2) {
    handName = 'TWO_PAIR'
    const pairRanks = findAllRanksWithCount(rankCounts, 2)
    scoringCards = validCards.filter((c) => pairRanks.includes(c.rank))
  } else if (counts[0] >= 2) {
    handName = 'ONE_PAIR'
    const pairRank = findRankWithCount(rankCounts, 2)
    scoringCards = validCards.filter((c) => c.rank === pairRank)
  } else {
    // High card - best single card
    const maxRank = Math.max(...ranks.map((r) => (r === 1 ? 14 : r)))
    const actualRank = maxRank === 14 ? 1 : maxRank
    scoringCards = validCards.filter((c) => c.rank === actualRank).slice(0, 1)
  }

  const base = HAND_VALUES[handName]

  // Calculate bonus chips and mult from card bonuses
  const bonusChips = scoringCards.reduce((sum, c) => sum + c.chipBonus, 0)
  const bonusMult = scoringCards.reduce((sum, c) => sum + c.multBonus, 0)

  // Also add rank value as chips for scoring cards
  const rankChips = scoringCards.reduce(
    (sum, c) => sum + (c.rank === 1 ? 11 : Math.min(c.rank, 10)),
    0,
  )

  const totalChips = base.chips + rankChips + bonusChips
  const totalMult = base.mult + bonusMult

  return {
    handName,
    displayName: HAND_DISPLAY[handName],
    baseChips: base.chips,
    baseMult: base.mult,
    totalChips,
    totalMult,
    finalScore: totalChips * totalMult,
    scoringCards,
  }
}

function checkStraight(sortedRanks: number[]): boolean {
  if (sortedRanks.length < 5) return false
  const unique = [...new Set(sortedRanks)]
  if (unique.length < 5) return false

  // Normal straight check
  for (let i = 0; i <= unique.length - 5; i++) {
    if (unique[i + 4] - unique[i] === 4) return true
  }

  // Ace-high straight: A,10,J,Q,K
  if (
    unique.includes(1) &&
    unique.includes(10) &&
    unique.includes(11) &&
    unique.includes(12) &&
    unique.includes(13)
  ) {
    return true
  }

  return false
}

function findRankWithCount(
  counts: Map<number, number>,
  target: number,
): number {
  for (const [rank, count] of counts) {
    if (count === target) return rank
  }
  return 0
}

function findAllRanksWithCount(
  counts: Map<number, number>,
  target: number,
): number[] {
  const result: number[] = []
  for (const [rank, count] of counts) {
    if (count >= target) result.push(rank)
  }
  return result
}

/**
 * Generate a seeded random number for deterministic card assignment
 */
export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280
  return x - Math.floor(x)
}

/**
 * Assign card properties to a member profile
 */
export function profileToCard(
  profile: {
    userId: string
    userName: string
    profileImageUrl?: string
    profileIntro?: string
    githubAccount?: string
    instaAccount?: string
  },
  index: number,
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  position?: string,
): GameCard {
  const seed = index + profile.userId.charCodeAt(0)
  const suits: GameCard['suit'][] = ['spades', 'hearts', 'diamonds', 'clubs']

  const rank = (Math.floor(seededRandom(seed * 3) * 13) + 1) as number
  const suit = suits[Math.floor(seededRandom(seed * 7) * 4)]

  // Rarity bonuses
  const rarityBonuses = {
    common: { chip: 0, mult: 0 },
    rare: { chip: 5, mult: 1 },
    epic: { chip: 10, mult: 2 },
    legendary: { chip: 20, mult: 3 },
  }

  return {
    id: `card-${profile.userId}-${index}`,
    rank,
    suit,
    rarity,
    userName: profile.userName,
    userId: profile.userId,
    position,
    profileImageUrl: profile.profileImageUrl,
    profileIntro: profile.profileIntro,
    githubAccount: profile.githubAccount,
    instaAccount: profile.instaAccount,
    chipBonus: rarityBonuses[rarity].chip,
    multBonus: rarityBonuses[rarity].mult,
  }
}
