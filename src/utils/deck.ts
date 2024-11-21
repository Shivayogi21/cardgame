const suits = ['Spades', 'Hearts', 'Diamonds', 'Clubs'] as const;
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'] as const;

type Suit = typeof suits[number];
type Rank = typeof ranks[number];

export interface Card {
  suit: Suit;
  rank: Rank;
}

const rankValues: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

// Create the deck of 52 cards
export function createDeck(): Card[] {
  const deck: Card[] = [];
  suits.forEach(suit => {
    ranks.forEach(rank => {
      deck.push({ suit, rank });
    });
  });
  return shuffleDeck(deck);
}

// Shuffle the deck
export function shuffleDeck(deck: Card[]): Card[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

// Convert card rank to a numeric value for comparison (Ace is high)
export function getCardValue(card: Card): number {
  return rankValues[card.rank];
}
