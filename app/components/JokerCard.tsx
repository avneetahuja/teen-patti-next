import Image from 'next/image';
import React from 'react';

interface CardProps {
  value: number;
  suit: string;
}

const Card: React.FC<CardProps> = ({ value, suit }) => (
  <div className="border rounded-md flex items-center justify-center bg-white m-1 shadow-md">
    <Image alt={value + " of " + suit} src={`/images/face_down.png`} width={200} height={192} />
  </div>
);

export default Card;
