import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import styles from "../styles.css";
import Game from "./Game";
import Header from "./Header";
import Timer from "./Timer";

function App() {
  const [gameId, setGameId] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  });

  return (
    <div className="game">
      <Header />
      <Game
        key={gameId}
        secondsLeft={timeLeft}
        startNewGame={() => {
          setTimeLeft(10);
          setGameId(gameId + 1);
        }}
      />
      <Timer secondsLeft={timeLeft} />
    </div>
  );
}
export default App;
