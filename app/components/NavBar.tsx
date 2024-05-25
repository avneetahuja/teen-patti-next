import React, { useState } from 'react';

interface NavBarProps {
  balance: number;
  handleBuyIn: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ balance,handleBuyIn }) => {

  

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img src="/images/14_of_spades.png" alt="Logo" className="h-10 w-10 mr-3" />
        <img src="/images/14_of_spades.png" alt="Logo" className="h-10 w-10 mr-3" />
        <img src="/images/14_of_spades.png" alt="Logo" className="h-10 w-10 mr-3" />
        <span className="text-lg font-bold">Teen Patti</span>
      </div>
      <div className="flex-grow text-center">
        <span className="text-xl">Your Balance: ${balance}</span>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleBuyIn}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Buy In
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Rules
        </button>
      </div>
    </nav>
  );
};
