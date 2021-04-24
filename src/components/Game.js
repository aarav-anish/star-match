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

function Game() {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([]);
  // const [timeLeft, setTimeLeft] = useState(10);

  const areCandidatesWrong = utils.sum(candidateNums) > stars;
  // const gameStatus =

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
    if (currentStatus === "used") {
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
        <DisplayStars count={stars} />
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
