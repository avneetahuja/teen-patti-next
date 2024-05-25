const suits: string[] = ["hearts", "diamonds", "clubs", "spades"];
const values: number[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export const generateDeck = (): { value: number; suit: string }[] => {
  return suits.flatMap((suit) => values.map((value) => ({ value, suit })));
};

export const shuffleDeck = (
  deck: { value: number; suit: string }[]
): { value: number; suit: string }[] => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

export const dealCards = (
  deck: { value: number; suit: string }[]
): [{ value: number; suit: string }[], { value: number; suit: string }[]] => {
  return [deck.slice(0, 3), deck.slice(3, 6)];
};

export const calculateHandScore = (
  hand: { value: number; suit: string }[]
): number => {
  const values: number[] = hand.map((card) => card.value).sort((a, b) => a - b);
  const suits: string[] = hand.map((card) => card.suit);

  if (new Set(values).size === 1) {
    return 1200 + values[0]; // Trail
  }

  if (new Set(suits).size === 1) {
    if (values[0] === 2 && values[1] === 3 && values[2] === 5) {
      return 1100; // 235 Pure Sequence
    }
    if (values[0] === 2 && values[1] === 3 && values[2] === 14) {
      return 900; // A23 Pure Sequence
    }
    if (values[0] === 12 && values[1] === 13 && values[2] === 14) {
      return 1000; // QKA Pure Sequence
    }
    if (values[2] === values[1] + 1 && values[1] === values[0] + 1) {
      return 800 + values[2]; // Pure Sequence
    }
    return 300 + values[2] + values[1] / 100 + values[0] / 10000; // Flush
  }

  if (new Set(values).size === 2) {
    if (values[0] === values[1] || values[1] === values[2]) {
      return (
        200 +
        values[1] +
        (values[0] === values[1] ? values[2] : values[0]) / 100
      ); // Pair
    }
  }

  if (values[0] === 2 && values[1] === 3 && values[2] === 5) {
    return 700; // 235 Sequence
  }
  if (values[0] === 2 && values[1] === 3 && values[2] === 14) {
    return 500; // A23 Sequence
  }
  if (values[0] === 12 && values[1] === 13 && values[2] === 14) {
    return 600; // QKA Sequence
  }
  if (values[2] === values[1] + 1 && values[1] === values[0] + 1) {
    return 400 + values[2]; // Sequence
  }

  return 100 + values[2] + values[1] / 100 + values[0] / 10000; // High Card
};
export const computerTurn = (score: number, bet: number): string => {
    if (score < 112) {
        return "fold";
    } else if (score < 200) {
        return "show";
    } else {
        return "bet";
    }
}


