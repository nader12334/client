import React, { useState } from "react";
import { useEffect } from "react";
import JumpBack from "./jumpBackToList";

const GatherInfoFinal = ({ props }) => {
  const {
    info,
    race,
    setInfo,
    setView,
    classChoice,
    setLanguageAndProficiencies,
    languageAndProficiencies,
  } = props;
  const [extraProficiency, setExtraProficiency] = useState([]);

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/proficiencies")
      .then((data) => data.json())
      .then((list) => {
        setExtraProficiency(list.results);
      });
  }, []);

  return (
    <div id="gatherInfoFinal">
      <JumpBack setView={setView}/>
      <div className="basicSection">
        <span>
          You are nearly done creating your character!
          <br />
          <br />
          Think about detail about your character
          <br />
          <br />
          From their Motivations, to their flaws.
          <br />
          <br />
          Their Ethics and their Morals.
          <br />
          <br />
          What types of things do they excel at, and what do they struggle with?
          <br />
          <br />
        </span>
        {classChoice === "Wizard" && (
          <em>
            Your character is a Wizard, just like me, so I'm sure they have few
            weaknesses
            <br />
            <br />
          </em>
        )}
        {classChoice !== "Wizard" && (
          <em>
            You didn't choose Wizard, so I'm sure your character has many
            struggles!
            <br />
            <br />
          </em>
        )}
        <span>
          Regardless, below, please choose a background for your character.
          <br />
          <br />
          This will solidify their story.
          <br />
          <br />
          Giving them a past you can draw upon for your adventure!
          <br />
          <br />
          i.e. Soldier, Scholar, Performer, Noble, Criminal... Programmer?
          <br />
          <br />
          <strong>1st Level {classChoice} </strong>
          <strong>{race}</strong>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const newClass = {};
              newClass.class = classChoice
              newClass.level = 1;
              const newClassInformation = {
                level: 1,
                jobs: [],
                Race: race,
                Background: e.target[0].value,
                experience: 0,
              };
              newClassInformation.jobs.push(newClass)

              setLanguageAndProficiencies([
                ...languageAndProficiencies,
                e.target[1].value,
              ]);
              setInfo(newClassInformation);
              setView(4);
            }}
          >
            <label htmlFor="background"></label>
            <input
              type="text"
              id="background"
              maxLength="50"
              autoComplete="off"
            ></input>
            <div>
              Then, pick one last optional proficiency that makes sense with
              your chosen background.
            </div>
            <select id="proficiency-select" defaultValue="default">
              <option value="default" disabled>
                Select Proficiency
              </option>
              {extraProficiency.length > 0 &&
                extraProficiency.map((n) => {
                  if (n.index.includes("saving")) {
                    return <option value={n.index.slice(-3)}>{n.name}</option>;
                  } else if (n.index === "all-armor") {
                    return [];
                  } else {
                    return <option value={n.index}>{n.name}</option>;
                  }
                })}
            </select>
            <br />
            <br />
            <button>Submit</button>
          </form>
          <br />
        </span>
      </div>
    </div>
  );
};

export default GatherInfoFinal;
