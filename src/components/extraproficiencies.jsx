import React from "react";

const ExtraProficiencies = ({ props }) => {
  const { languageAndProficiencies, mainStats, info } = props;

  let perceptionMod = Math.floor((mainStats.Wisdom - 10) / 2);
  const levelMod = Math.floor(info.level / 4) + 2;

  if (languageAndProficiencies.includes("Skill: Perception")) {
    perceptionMod += levelMod;
  }

  const list = [];
  let key = 0
  for (let proficiency of languageAndProficiencies) {
    if (proficiency.slice(0, 5).toUpperCase() === "SKILL") {
      continue;
    } else if (proficiency.length === 3 && proficiency !== "Orc") {
      continue;
    } else {
      list.push(
        <span key={key}>
          - {proficiency[0].toUpperCase() + proficiency.slice(1)}
          <br />
        </span>
      );
      key += 1 
    }
  }

  return (
    <div id="extraproficiencies">
      <div className="basicBonus">
        <span className="basicMod">{10 + perceptionMod}</span>
        <span>Passive Wisdom (Perception)</span>
      </div>
      <div id="languagesAndProficienciesContainer">
        <strong className="attribute">Languages & Proficiencies:</strong>
        <br />
        {list}
      </div>
    </div>
  );
};

export default ExtraProficiencies;
