import React from 'react';
import Card from './Card';
import JokerCard from './JokerCard';

interface PlayerHandProps {
  cards: { value: number; suit: string }[];
}

const PlayerHand: React.FC<PlayerHandProps> = ({ cards }) => (
  <div className="flex space-x-2">
    {cards.length>0 && cards[0].value!==0 && cards.map((card, index) => (
      <Card key={index} value={card.value} suit={card.suit} />
    ))}
    {cards.length>0 && cards[0].value===0 && cards.map((card, index) => (
      <JokerCard key={index} value={card.value} suit={card.suit} />
    ))}
  </div>
);

export default PlayerHand;
