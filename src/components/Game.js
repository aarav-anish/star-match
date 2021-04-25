import React, { useState } from "react";
import utils from "../Math.utils";
import colors from "./colors";

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
      <p className="message">
        {props.message === "won" ? "Yayy! Won" : "Uh ohh!"}
      </p>
      <button className="message" onClick={props.onClick}>
        Play Again
      </button>
    </div>
  );
}

function Game(props) {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);

  const areCandidatesWrong = utils.sum(candidateNums) > stars;

  const gameStatus =
    availableNums.length === 0
      ? "won"
      : props.secondsLeft === 0
      ? "lost"
      : "active";

  function numberStatus(number) {
    if (!availableNums.includes(number)) {
      return "used";
    }
    if (candidateNums.includes(number)) {
      return areCandidatesWrong ? "wrong" : "candidate";
    }
    return "available";
  }

  function onNumberClick(number, currentStatus) {
    if (gameStatus !== "active" || currentStatus === "used") {
      return;
    }
    const newCandidateNums =
      currentStatus === "available"
        ? candidateNums.concat(number)
        : candidateNums.filter((cn) => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        (n) => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }

  function restartGame() {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
    props.restartTimer();
  }

  return (
    <div className="body">
      <div className="left">
        {gameStatus === "active" ? (
          <DisplayStars count={stars} />
        ) : (
          <PlayAgain message={gameStatus} onClick={restartGame} />
        )}
      </div>
      <div className="right">
        {utils.range(1, 9).map((number) => (
          <PlayNumber
            key={number}
            number={number}
            status={numberStatus(number)}
            onClick={onNumberClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
