import React, { useState } from "react";
import JumpBack from "./jumpBackToList";
import StatPool from "./statPool";

const RollStats = ({ props }) => {
  const { setView, setMainStats } = props;
  const [points, setPoints] = useState(27);

  return (
    <div className="wizardView">
      <JumpBack setView={setView}/>
      <strong>Time to roll stats!</strong>
      <br />
      <strong>
        These stats should match up with your characters personality
      </strong>
      <br />
      <strong>
        You have 27 points to spend on your ability scores.
        <br />
        Every point up to 13 costs 1 point,
        <br />
        14 and 15 cost 2.
        <br />
        This allows for{" "}
      </strong>
      <br />
      <strong>
        This method of determining ability scores enables you to create a set of
        three high numbers and three low ones (15, 15, 15, 8, 8, 8),
        <br /> a set of numbers that are above average and nearly equal (13, 13,
        13, 12, 12, 12)
        <br />
        or anything in-between
      </strong>
      <br />
      <StatPool
        setView={setView}
        points={points}
        setPoints={setPoints}
        setMainStats={setMainStats}
      />
    </div>
  );
};

export default RollStats;
