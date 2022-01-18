import React from "react";

const CombatStats = ({ props }) => {
  const { armorClass, speed, mainStats, info } = props;

  const conMod = Math.floor((mainStats.Constitution - 10) / 2);

  const hitDiceKey = {
    Sorcerer: "D6",
    Wizard: "D6",
    Artificer: "D8",
    Bard: "D8",
    Cleric: "D8",
    Druid: "D8",
    Monk: "D8",
    Rogue: "D8",
    Warlock: "D8",
    Fighter: "D10",
    Paladin: "D10",
    Ranger: "D10",
    Barbarian: "D12",
  };

  const hitDicePool = [];
  let maxHealth = 0;
  for (let job of info.jobs) {
    let dice = "";
    dice += job.level;
    dice += ":";
    dice += hitDiceKey[job.class];
    hitDicePool.push(dice);
    maxHealth +=
      Number(hitDiceKey[job.class].slice(1)) +
      conMod +
      (job.level - 1) *
        (Math.ceil(Number(hitDiceKey[job.class].slice(1)) / 2) + conMod);
  }

  return (
    <div id="combatStatsContainer">
      <div id="combatUtil">
        <div className="util">
          <span key={1} className="combatMod">{speed}</span>
          <strong key={2} className="attribute">Speed</strong>
        </div>
        <div className="util">
          <span key={2} className="combatMod">{armorClass}</span>
          <strong key={3} className="attribute">AC</strong>
        </div>
        <div className="util">
          <span className="combatMod"></span>
          <strong className="attribute">Initiative</strong>
        </div>
      </div>

      <div id="healthContainer">
        <div key={0} id="currentHitPoints">
          <div className="healthBox">{maxHealth}</div>
        </div>
        <strong className="attribute">Hitpoint Maximum</strong>
        <div key={1} id="tempHitPoints">
          <div className="healthBox"></div>
        </div>
        <strong className="attribute">Temporary Hitpoints</strong>
      </div>

      <div id="hitDieAndDeathSaves">
        <div id="hitDie">
          <span key={3} className="attribute">Hit Dice</span>
          {hitDicePool.map((dice, idx) => (
            <span key={idx} className="dice">______ | {dice}</span>
          ))}
          <span key={6} className="attribute">Remaining/ Total</span>
        </div>
        <div id="deathSaves">
          <div 
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <span className="attribute">Successes</span>
            <input key={0} className="regular-checkbox" type="checkbox"></input>
            <input key={1} className="regular-checkbox" type="checkbox"></input>
            <input key={2} className="regular-checkbox" type="checkbox"></input>
          </div>
          <div
            style={{
              display: "flex",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <span className="attribute">Failures</span>
              <input key={0} className="regular-checkbox" type="checkbox"></input>
              <input key={1} className="regular-checkbox" type="checkbox"></input>
              <input key={2} className="regular-checkbox" type="checkbox"></input>
          </div>
          <span className="attribute">Death Saves</span>
        </div>
      </div>
    </div>
  );
};

export default CombatStats;
