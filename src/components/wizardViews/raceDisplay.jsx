import { useState, useEffect } from "react";
import JumpBack from "./jumpBackToList";
import axios from "axios";

const RaceDisplay = ({ props }) => {
  const {
    userId,
    setRace,
    mainStats,
    setView,
    setSpeed,
    setInfoViews,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
    setMainStats,
  } = props;
  const [raceList, setRaceList] = useState([]);
  const [raceInfo, setRaceInfo] = useState(false);
  const newStats = { ...mainStats };
  const newProficienciesAndLanguages = [];
  const newFeatsAndTraits = [];
  const statKey = {
    str: "Strength",
    con: "Constitution",
    dex: "Dexterity",
    int: "Intelligence",
    wis: "Wisdom",
    cha: "Charisma",
  };

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/races").then(({ data }) => {
      setRaceList(data.results);
    });
  }, []);

  return (
    <div id="raceView">
      {userId ? <JumpBack setView={setView} /> : null}
      <div>
        Choose what race your character belongs to. <br />
        Below you can see all the information for each race.
      </div>
      <br />
      <form>
        <label htmlFor="race-select">Choose a race:</label>
        <select
          onChange={(e) => {
            fetch(`https://www.dnd5eapi.co/api/races/${e.target.value}`)
              .then((data) => data.json())
              .then((raceInfo) => {
                setRaceInfo(raceInfo);
              });
          }}
          defaultValue="default"
          name="races"
          id="race-select"
        >
          <option value="default" disabled>
            Select your Race
          </option>
          {raceList.map((race, idx) => (
            <option key={idx} value={race.index}>
              {race.name}
            </option>
          ))}
        </select>
        {raceInfo.hasOwnProperty("language_options") && (
          <div>
            <label htmlFor="language-select">
              Choose an extra language:
              <br />
            </label>
            <select
              name="languages"
              id="language-select"
              defaultValue="default"
            >
              <option value="default">Select Language</option>
              {raceInfo.language_options.from.map((language, idx) => (
                <option key={idx} value={language.name}>
                  {language.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {raceInfo.hasOwnProperty("starting_proficiency_options") && (
          <div>
            <label htmlFor="proficiency-select">
              Choose Bonus proficiencies:
              <br />
            </label>
            {new Array(raceInfo.starting_proficiency_options.choose)
              .fill(0)
              .map((i, idx) => (
                <div key={idx}>
                  <select
                    name="proficiency"
                    id="proficiency-select"
                    defaultValue={"default"}
                  >
                    <option key={0} value="default">Select Proficiency</option>)
                    {raceInfo.starting_proficiency_options.from.map(
                      (prof, key) => (
                        <option key={key + 1} value={prof.index}>
                          {prof.name}
                        </option>
                      )
                    )}
                  </select>
                  <br />
                </div>
              ))}
          </div>
        )}
        <br />
        Read through all the information and select your bonuses before
        submitting!
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            let current = 0;
            while (e.target.form[current]) {
              if (e.target.form[current].value === "default") {
                alert("Please make all selections before submitting!");
                break;
              }
              if (e.target.form[current].value === "") {
                setRace(e.target.form[0].selectedOptions[0].text);
                setSpeed(raceInfo.speed);
                setMainStats(newStats);
                setLanguageAndProficiencies(newProficienciesAndLanguages);
                setFeaturesAndTraits(newFeatsAndTraits);
                setInfoViews(1);
                break;
              }
              newProficienciesAndLanguages.push(e.target.form[current].value);
              current++;
            }
          }}
        >
          Submit
        </button>
      </form>
      <br />

      {raceInfo && (
        <div id="raceDisplay">
          <div className="basicSection">
            Base Movement Speed: {raceInfo.speed}
          </div>
          <div className="basicSection">Size: {raceInfo.size}</div>
          <div className="basicSection">
            Ability Bonuses:
            {raceInfo.ability_bonuses.map((bonus, idx) => {
              newStats[statKey[bonus.ability_score.index]] += bonus.bonus;
              return (
                <li key={idx}>
                  {bonus.ability_score.name} +{bonus.bonus}
                </li>
              );
            })}
          </div>
          <div className="basicSection">
            Starting Proficiencies:
            {raceInfo.starting_proficiencies.map((proficiency, idx) => {
              newProficienciesAndLanguages.push(proficiency.index);
              return <li key={idx}>{proficiency.name}</li>;
            })}
            <br />
          </div>
          <div className="basicSection">
            Traits:
            {raceInfo.traits.map((trait, idx) => {
              newFeatsAndTraits.push("traits/" + trait.index);
              return <li key={idx}>{trait.name}</li>;
            })}
          </div>
          <div className="basicSection">
            Languages:
            {raceInfo.languages.map((language, idx) => {
              newProficienciesAndLanguages.push(language.name);
              return <li key={idx}>{language.name}</li>;
            })}
            {raceInfo.language_desc}
          </div>
          <div className="basicSection">
            Extra Information:
            <li>{raceInfo.alignment}</li>
            <li>{raceInfo.age}</li>
            <li>{raceInfo.size_description}</li>
          </div>
        </div>
      )}
    </div>
  );
};

export default RaceDisplay;
