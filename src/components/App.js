import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import styles from "../styles.css";
import Game from "./Game";
import Header from "./Header";
import Timer from "./Timer";

function App() {
  const [timeLeft, setTimeLeft] = useState(10);

  if (timeLeft > 0) {
    setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
  }
  return (
    <div className="game">
      <Header />
      <Game secondsLeft={timeLeft} restartGame={() => setTimeLeft(10)} />
      <Timer secondsLeft={timeLeft} />
    </div>
  );
}
export default App;
