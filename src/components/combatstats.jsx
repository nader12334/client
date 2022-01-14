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
        <div key={0} className="util">
          <span className="combatMod">{speed}</span>
          <strong className="attribute">Speed</strong>
        </div>
        <div key={1} className="util">
          <span className="combatMod">{armorClass}</span>
          <strong className="attribute">AC</strong>
        </div>
        <div key={2} className="util">
          <span className="combatMod"></span>
          <strong className="attribute">Initiative</strong>
        </div>
      </div>

      <div id="healthContainer">
        <div id="currentHitPoints">
          <div className="healthBox">{maxHealth}</div>
        </div>
        <strong className="attribute">Hitpoint Maximum</strong>
        <div id="tempHitPoints">
          <div className="healthBox"></div>
        </div>
        <strong className="attribute">Temporary Hitpoints</strong>
      </div>

      <div id="hitDieAndDeathSaves">
        <div id="hitDie">
          <span className="attribute">Hit Dice</span>
          {hitDicePool.map((dice) => (
            <span className="dice">______ | {dice}</span>
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
            <span key={4} className="attribute">Successes</span>
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
            <span key={5} className="attribute">Failures</span>
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
