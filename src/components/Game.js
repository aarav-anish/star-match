import React, { useState } from "react";
import utils from "../Math.utils";
import gameComponents from "./gameComponents";

function Game(props) {
  const { DisplayStars, PlayNumber, PlayAgain } = gameComponents();

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

  return (
    <div className="body">
      <div className="left">
        {gameStatus === "active" ? (
          <DisplayStars count={stars} />
        ) : (
          <PlayAgain gameStatus={gameStatus} onClick={props.startNewGame} />
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
