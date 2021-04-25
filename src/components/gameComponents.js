import React from "react";
import utils from "../Math.utils";
import colors from "./colors";

function gameComponents() {
  function DisplayStars(props) {
    return (
      <>
        {utils.range(1, props.count).map((starId) => (
          <div key={starId} className="star" />
        ))}
      </>
    );
  }

  function PlayNumber(props) {
    return (
      <button
        className="number"
        style={{ backgroundColor: colors[props.status] }}
        onClick={() => props.onClick(props.number, props.status)}
      >
        {props.number}
      </button>
    );
  }

  function PlayAgain(props) {
    return (
      <div className="game-done">
        <p
          className="message"
          style={{ color: props.gameStatus === "won" ? "green" : "red" }}
        >
          {props.gameStatus === "won" ? "Yayy! Won" : "Uh ohh!"}
        </p>
        <button className="message" onClick={props.onClick}>
          Play Again
        </button>
      </div>
    );
  }

  return { DisplayStars, PlayNumber, PlayAgain };
}

export default gameComponents;
