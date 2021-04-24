import React from "react";

function Timer(props) {
  return <div className="timer">Time Remaining: {props.secondsLeft}</div>;
}

export default Timer;
