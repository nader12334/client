import React from "react";

const MainStats = (props) => {
  const { mainStats } = props;

  const stats = [];
  let idx = 0;
  for (let stat in mainStats) {
    const mod = Math.floor((mainStats[stat] - 10) / 2);
    const modSign = mod >= 0 ? "+" : "";
    stats.push(
      <div key={idx} className="mainStat">
        <span className="attribute">{stat}</span>
        <span className="stat">{mainStats[stat]}</span>
        <span className="modifier">
          {modSign}
          {mod}
        </span>
      </div>
    );
    idx += 1;
  }

  return <div id="mainStatsContainer">{stats}</div>;
};

export default MainStats;
