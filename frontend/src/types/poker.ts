/**
 * Balatro-style poker card game types
 */

export type CardRarity = 'common' | 'rare' | 'epic' | 'legendary'

export type CardSuit = 'spades' | 'hearts' | 'diamonds' | 'clubs'

export interface GameCard {
  id: string
  rank: number // 1-13 (A=1, J=11, Q=12, K=13)
  suit: CardSuit
  rarity: CardRarity
  // Member info
  userName: string
  userId: string
  position?: string
  profileImageUrl?: string
  profileIntro?: string
  githubAccount?: string
  instaAccount?: string
  // Game stats
  chipBonus: number
  multBonus: number
}

export type PokerHandName =
  | 'HIGH_CARD'
  | 'ONE_PAIR'
  | 'TWO_PAIR'
  | 'THREE_OF_A_KIND'
  | 'STRAIGHT'
  | 'FLUSH'
  | 'FULL_HOUSE'
  | 'FOUR_OF_A_KIND'
  | 'STRAIGHT_FLUSH'
  | 'ROYAL_FLUSH'

export interface HandResult {
  handName: PokerHandName
  displayName: string
  baseChips: number
  baseMult: number
  totalChips: number
  totalMult: number
  finalScore: number
  scoringCards: GameCard[]
}

export type GamePhase = 'SELECTING' | 'PLACED' | 'SCORING' | 'RESULT'

export interface GameState {
  round: number
  targetScore: number
  playerScore: number
  opponentScore: number
  phase: GamePhase
  playerHand: GameCard[]
  playerSlots: (GameCard | null)[]
  opponentSlots: GameCard[]
  selectedCardId: string | null
  playerHandResult: HandResult | null
  opponentHandResult: HandResult | null
  winner: 'player' | 'opponent' | 'draw' | null
}
