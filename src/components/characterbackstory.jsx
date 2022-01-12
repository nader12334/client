import React from "react";

const CharacterBackstory = ({ props }) => {
  const { characterDescription } = props;
  const { personality, bonds, ideals, flaws } = characterDescription;

  return (
    <div id="characterBackstory">
      <div className="personalitySection">
        <strong className="attribute">Personality Traits: </strong>
        <span>{personality}</span>
      </div>
      <div className="personalitySection">
        <strong className="attribute">Bonds: </strong>
        <span>{bonds}</span>
      </div>
      <div className="personalitySection">
        <strong className="attribute">Ideals: </strong>
        <span>{ideals}</span>
      </div>
      <div className="personalitySection">
        <strong className="attribute">Flaws: </strong>
        <span>{flaws}</span>
      </div>
    </div>
  );
};

export default CharacterBackstory;
