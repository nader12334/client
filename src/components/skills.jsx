import React from "react";
import SavingThrows from "./savingthrows";

const Skills = (props) => {
  const { mainStats, info, languageAndProficiencies } = props;
  const skills = {
    Acrobatics: "Dexterity",
    "Animal-handling": "Wisdom",
    Arcana: "Intelligence",
    Athletics: "Strength",
    Deception: "Charisma",
    History: "Intelligence",
    Insight: "Wisdom",
    Intimidation: "Charisma",
    Investigation: "Intelligence",
    Medicine: "Wisdom",
    Nature: "Intelligence",
    Perception: "Wisdom",
    Performance: "Charisma",
    Persuasion: "Charisma",
    Religion: "Intelligence",
    "Sleight-of-hand": "Dexterity",
    Stealth: "Dexterity",
    Survival: "Wisdom",
  };

  const skillDivs = [];
  const levelMod = Math.floor(info.level / 4) + 2;
  const proficiencies = [];
  for (let proficiency of languageAndProficiencies) {
    if (proficiency.slice(0, 5).toUpperCase() === "SKILL") {
      proficiencies.push(proficiency[6].toUpperCase() + proficiency.slice(7));
    }
  }
  let idx = 0;

  for (let skill in skills) {
    const mod = Math.floor((mainStats[skills[skill]] - 10) / 2);
    if (proficiencies.includes(skill)) {
      const modSign = mod >= -2 ? "+" : "";
      skillDivs.push(
        <div key={idx} className="skill">
          <input
            type="radio"
            className="regular-radio"
            style={{ pointerEvents: "none" }}
            checked
          ></input>
          <span className="skillMod">
            {modSign}
            {mod + levelMod}
          </span>
          <span>{skill}&nbsp;&nbsp;</span>
          <span className="secondaryText">
            ({skills[skill].slice(0, 3).toUpperCase()})
          </span>
        </div>
      );
    } else {
      const modSign = mod >= 0 ? "+" : "";
      skillDivs.push(
        <div key={idx} className="skill">
          <input
            type="radio"
            className="regular-radio"
            style={{ pointerEvents: "none" }}
          ></input>
          <span className="skillMod">
            {modSign}
            {mod}
          </span>
          <span>{skill}&nbsp;&nbsp;</span>
          <span className="secondaryText">
            ({skills[skill].slice(0, 3).toUpperCase()})
          </span>
        </div>
      );
    }

    idx += 1;
  }

  return (
    <div id="skillsContainer">
      <div className="basicBonus">
        <span className="basicMod">&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>Inspiration</span>
      </div>

      <div className="basicBonus">
        <span className="basicMod">+{levelMod}</span>
        <span>Proficiency Bonus</span>
      </div>
      <SavingThrows props={props} />
      <div id="skillMods">
        {skillDivs}
        <strong>Skills</strong>
      </div>
    </div>
  );
};

export default Skills;
