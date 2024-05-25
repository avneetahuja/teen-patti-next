"use client";
import Game from "./components/Game";
import { useState } from "react";
import { NavBar } from "./components/NavBar";

export default function Home() {
  const [navBarBalance, setNavBarBalance] = useState(1000);
  const [gameBalance, setGameBalance] = useState(0);
  const handleBuyIn = () => {
    if (navBarBalance>=1000){
      setNavBarBalance(navBarBalance-1000)
      setGameBalance(gameBalance+1000)
    }
    else{
      alert("Insufficient Balance")
    
    }
  }
  return (
    <div>
      <NavBar balance={navBarBalance} handleBuyIn={handleBuyIn}></NavBar>
      <Game balance={gameBalance} setBalance={setGameBalance}></Game>
    </div>
  );
}
