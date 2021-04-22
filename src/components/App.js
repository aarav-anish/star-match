import React from "react";
// eslint-disable-next-line no-unused-vars
import styles from "../styles.css";
import Game from "./Game";
import Header from "./Header";
import Timer from "./Timer";

function App() {
  return (
    <div className="game">
      <Header />
      <Game />
      <Timer />
    </div>
  );
}
export default App;
