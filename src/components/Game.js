import React, { useState } from "react";
import utils from "../Math.utils.js";

function Game() {
  const [stars, setStars] = useState(utils.random(1, 9));

  return (
    <div className="body">
      <div className="left">
        {utils.range(1, stars).map((starId) => (
          <div key={starId} className="star" />
        ))}
      </div>
      <div className="right">
        {utils.range(1, 9).map((number) => (
          <button key="number" className="number">
            {number}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
