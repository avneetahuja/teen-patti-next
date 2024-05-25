import React, { useState, useEffect } from "react";
import {
  generateDeck,
  shuffleDeck,
  dealCards,
  calculateHandScore,
  computerTurn,
} from "../../utils/gameLogic";
import PlayerHand from "./PlayerHand";

interface GameProps {
  balance: number;
  setBalance: (balance: number) => void;
}

const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


const Game: React.FC<GameProps> = ({ balance, setBalance }) => {
  const emptyHand = [
    { value: 0, suit: "" },
    { value: 0, suit: "" },
    { value: 0, suit: "" },
  ];
  const [deck, setDeck] = useState<{ value: number; suit: string }[]>([]);
  const [playerHand, setPlayerHand] = useState<
    { value: number; suit: string }[]
  >([]);
  const [computerHand, setComputerHand] = useState<
    { value: number; suit: string }[]
  >([]);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [computerScore, setComputerScore] = useState<number>(0);
  const [pot, setPot] = useState<number>(100);
  const [bet, setBet] = useState<number>(50);
  const [show, setShow] = useState<boolean>(false);
  const [gameLog, setGameLog] = useState<string[]>(["Game Started!"]);
  const [gameInProgress, setGameInProgress] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const newDeck = shuffleDeck(generateDeck());
    setDeck(newDeck);
    const [playerCards, computerCards] = dealCards(newDeck);
    setPlayerHand(playerCards);
    setComputerHand(computerCards);
    setPlayerScore(calculateHandScore(playerCards));
    setComputerScore(calculateHandScore(computerCards));
  }, []);

  useEffect(() => {
    if (pot >= 500) {
      handleShow();
    }
  }, [pot]);

  useEffect(() => {
    if (balance < bet) {
      handleInsufficientBalance();
    }
  }, [balance, bet]);
  useEffect(() => {
    if (balance > 0) {
      setGameOver(false);
    }
  }, [balance, bet]);

  const handleInsufficientBalance = () => {
    setShow(true);
    if (playerScore > computerScore) {
      setBalance(balance + pot);
      setGameLog([
        ...gameLog,
        "You have insufficient balance to bet!",
        `You have asked for a show!`,
        `You win!`,
      ]);
      // alert("You win!");
    } else {
      setGameLog([
        ...gameLog,
        "You have insufficient balance to bet!",
        `You have asked for a show!`,
        `You lose!`,
      ]);
      setGameOver(true);
      // alert("You lose!");
    }
    setGameInProgress(false);
  };

  const handleBet = async () => {
    setBalance(balance - bet);
    const result = computerTurn(computerScore, bet);
    if (result === "fold") {
      setPot(pot + bet);
      await delay(500);
      setGameLog([
        ...gameLog,
        `You bet $${bet}`,
        "Computer folded!",
        "You win!",
      ]);
      setBalance(balance + pot);
      setGameInProgress(false);
    } else if (result === "show") {
      await delay(500);
      setPot(pot + 2*bet);
      setShow(true);
      if (playerScore > computerScore) {
        setBalance(balance + pot);
        setGameLog([
          ...gameLog,
          `You bet $${bet}`,
          `Computer asked for a  show!`,
          `You win!`,
        ]);
        // alert("You win!");
      } else {
        await delay(500);
        setGameLog([
          ...gameLog,
          `You bet $${bet}`,
          `Computer asked for a show!`,
          `You lose!`,
        ]);

        // alert("You lose!");
      }
      setGameInProgress(false);
    } else {
      setPot(pot + 2*bet);
      setGameLog([...gameLog, `You bet $${bet}`, `Computer bet $${bet}`]);
    }
    // if (pot >= 450) {
    //   setGameLog((prevGameLog) => [...prevGameLog, "Pot limit reached!"]);
    // } else {
    //   setGameLog([...gameLog, `You bet $${bet}`]);
    // }
  };

  const handleShow = () => {
    setBalance(balance - bet);
    setGameLog([...gameLog, `You have asked for a show!`]);
    setShow(true);
    if (playerScore > computerScore) {
      setBalance(balance + pot);
      setGameLog([...gameLog, `You have asked for a show!`, `You win!`]);
      // alert("You win!");
    } else {
      setGameLog([...gameLog, `You have asked for a show!`, `You lose!`]);
      // alert("You lose!");
    }
    setGameInProgress(false);
    // resetGame();
  };

  const handleFold = () => {
    setGameLog([...gameLog, `You folded.`]);
    setGameInProgress(false);
    // alert("You folded.");
    // resetGame();
  };

  const handleContinue = () => {
    setGameInProgress(true);
    resetGame();
  };

  const resetGame = () => {
    const newDeck = shuffleDeck(generateDeck());
    setDeck(newDeck);
    const [playerCards, computerCards] = dealCards(newDeck);
    setPlayerHand(playerCards);
    setComputerHand(computerCards);
    setPlayerScore(calculateHandScore(playerCards));
    setComputerScore(calculateHandScore(computerCards));
    setBalance(balance > 0 ? balance - 50 : 0);
    setPot(100);
    setGameLog(["Game Started!"]);
    setShow(false);
  };

  return (
    <div>
      {gameOver ? (
        <div className="p-8 gap-4">
          <h1 className="text-3xl font-bold mt-5 text-center">
            Buy In To Play
          </h1>
        </div>
      ) : (
        <div className="p-8 gap-4">
          <h1 className="text-3xl font-bold mt-5 text-center">
            {gameLog[gameLog.length - 1]}
          </h1>
          <div className="flex justify-between items-start gap-8">
            {/* Player's Hand */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl mt-5">Your Hand</h2>
              <PlayerHand cards={playerHand} />
            </div>

            {/* Game Info and Buttons */}
            <div className="flex flex-col items-center gap-6">
              <div className="mt-5 text-center">
                <h2 className="text-xl">Your Balance: ${balance}</h2>
                <h2 className="text-xl">Pot: ${pot}</h2>
              </div>
              <div className="flex flex-col gap-4 mt-5">
                {gameInProgress ? (
                  <div className="flex flex-col items-center">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-md m-2 hover:bg-blue-700 transition"
                      onClick={handleBet}
                    >
                      Bet
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-md m-2 hover:bg-red-700 transition"
                      onClick={handleFold}
                    >
                      Fold
                    </button>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-md m-2 hover:bg-green-700 transition"
                      onClick={handleShow}
                    >
                      Show
                    </button>
                  </div>
                ) : (
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md m-2 hover:bg-green-700 transition"
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                )}
              </div>
              <div className="mt-5 text-center">
                <h2 className="text-xl">Current Bet: ${bet}</h2>
              </div>
            </div>

            {/* Computer's Hand */}
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl mt-5">Computers Hand</h2>
              <PlayerHand cards={show ? computerHand : emptyHand} />
            </div>
          </div>

          {/* Game Log */}
          <div className="mt-8">
            <h2 className="text-2xl mb-2">Game Log</h2>
            <div className="bg-gray-100 p-4 rounded-md max-h-64 overflow-y-auto">
              {gameLog.map((log, index) => (
                <p key={index} className="text-sm">
                  {log}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
