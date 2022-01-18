import React from "react";

const SavingThrows = ({ props }) => {
  const { mainStats, languageAndProficiencies } = props;

  const divs = [];
  const fields = [
    "Strength",
    "Dexterity",
    "Constitution",
    "Intelligence",
    "Wisdom",
    "Charisma",
  ];

  let idx = 0;
  for (let field of fields) {
    let mod = Math.floor((mainStats[field] - 10) / 2);
    if (
      languageAndProficiencies.includes(
        field[0].toLowerCase() + field.slice(1, 3)
      )
    )
      mod += 2;
    const modSign = mod >= 0 ? "+" : "";
    if (
      languageAndProficiencies.includes(
        field[0].toLowerCase() + field.slice(1, 3)
      )
    ) {
      divs.push(
        <div key={idx} className="savingThrow">
          <input
            type="radio"
            style={{ pointerEvents: "none" }}
            className="regular-radio"
            checked
          ></input>
          <span className="skillMod">
            {modSign}
            {mod}
          </span>
          <span>{field}&nbsp;&nbsp;</span>
          <span className="secondaryText">
            ({field.slice(0, 3).toUpperCase()})
          </span>
        </div>
      );
    } else {
      divs.push(
        <div key={idx} className="savingThrow">
          <input
            type="radio"
            style={{ pointerEvents: "none" }}
            className="regular-radio"
          ></input>
          <span className="skillMod">
            {modSign}
            {mod}
          </span>
          <span>{field}&nbsp;&nbsp;</span>
          <span className="secondaryText">
            ({field.slice(0, 3).toUpperCase()})
          </span>
        </div>
      );
    }
    idx += 1;
  }

  return (
    <div id="savingThrows">
      {divs}
      <strong>Saving Throws</strong>
    </div>
  );
};

export default SavingThrows;
