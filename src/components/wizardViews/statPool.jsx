import React, { useState } from "react";
import JumpBack from "./jumpBackToList";

const StatPool = (props) => {
  const { setView, points, setPoints, setMainStats } = props;
  const statKey = {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9,
  };
  const [spentPoints, setSpentPoints] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });
  const [areYouSure, setAreYouSure] = useState(false);
  const handleSubtract = (e) => {
    const newPoints = spentPoints;

    if (newPoints[e.target.value] > 8 && newPoints[e.target.value] <= 15) {
      newPoints[e.target.value]--;
      const pointChange =
        statKey[newPoints[e.target.value]] -
        statKey[newPoints[e.target.value] + 1];
      setSpentPoints(newPoints);
      setPoints(points - pointChange);
    }
  };

  const handleAdd = (e) => {
    const newPoints = spentPoints;
    const possiblePointShift =
      statKey[newPoints[e.target.value] + 1] -
      statKey[newPoints[e.target.value]];

    if (
      newPoints[e.target.value] >= 8 &&
      newPoints[e.target.value] < 15 &&
      points - possiblePointShift >= 0
    ) {
      newPoints[e.target.value]++;
      const pointChange =
        statKey[newPoints[e.target.value]] -
        statKey[newPoints[e.target.value] - 1];
      setSpentPoints(newPoints);
      setPoints(points - pointChange);
    }
  };

  return (
    <div id="statRoll">
      <div id="pool">
        Remaining Points:
        <br />
        {points}
      </div>
      <div id="statDisplay">
        <div className="statSetting">
          <div>{spentPoints["Strength"]}</div>
          <div>STR</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Strength"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value="Strength"
            >
              +
            </button>
          </div>
        </div>
        <div className="statSetting">
          <div>{spentPoints["Dexterity"]}</div>
          <div>DEX</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Dexterity"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value={"Dexterity"}
            >
              +
            </button>
          </div>
        </div>
        <div className="statSetting">
          <div>{spentPoints["Constitution"]}</div>
          <div>CON</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Constitution"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value={"Constitution"}
            >
              +
            </button>
          </div>
        </div>
        <div className="statSetting">
          <div>{spentPoints["Intelligence"]}</div>
          <div>INT</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Intelligence"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value={"Intelligence"}
            >
              +
            </button>
          </div>
        </div>
        <div className="statSetting">
          <div>{spentPoints["Wisdom"]}</div>
          <div>WIS</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Wisdom"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value={"Wisdom"}
            >
              +
            </button>
          </div>
        </div>
        <div className="statSetting">
          <div>{spentPoints["Charisma"]}</div>
          <div>CHA</div>
          <div>
            <button
              className="rollStatButton"
              onClick={handleSubtract}
              value={"Charisma"}
            >
              -
            </button>
            <button
              className="rollStatButton"
              onClick={handleAdd}
              value={"Charisma"}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {areYouSure && (
        <span>
          You have unspent points, are you sure you would like to submit stats?
        </span>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          if (points > 0 && !areYouSure) {
            setAreYouSure(true);
          } else if (points > 0 && areYouSure) {
            setMainStats(spentPoints);
            setView(3);
          } else {
            setMainStats(spentPoints);
            setView(3);
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default StatPool;
