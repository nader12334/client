import react, { useState, useEffect } from "react";
import JumpBack from "./jumpBackToList";

const RaceDisplay = ({ props }) => {
  const {
    userId,
    setRace,
    mainStats,
    setView,
    setSpeed,
    setInfoViews,
    setInfo,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
    setMainStats,
  } = props;
  const [raceList, setRaceList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [raceInfo, setRaceInfo] = useState({
    index: "",
    name: "",
    speed: 30,
    ability_bonuses: [],
    alignment: "",
    age: "",
    size: "",
    size_description: "",
    starting_proficiencies: [],
    languages: [],
    language_desc: "",
    traits: [],
    subraces: [],
    url: "",
  });

  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/races")
      .then((data) => data.json())
      .then((racelist) => {
        setRaceList(racelist.results);
      });
  }, []);

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

  const races = [];
  races.push(
    <option value="default" disabled>
      Select your Race
    </option>
  );
  for (let race of raceList) {
    races.push(<option value={race.index}>{race.name}</option>);
  }

  const languages = [];
  for (let language of raceInfo.languages) {
    newProficienciesAndLanguages.push(language.name);
    languages.push(<li>{language.name}</li>);
  }

  const languagesoptions = [];
  if (raceInfo.hasOwnProperty("language_options")) {
    languagesoptions.push(<option value="default">Select Language</option>);
    for (let language of raceInfo.language_options.from) {
      languagesoptions.push(
        <option value={language.name}>{language.name}</option>
      );
    }
  }

  const totalProfOptions = [];
  if (raceInfo.hasOwnProperty("starting_proficiency_options")) {
    for (let i = 0; i < raceInfo.starting_proficiency_options.choose; i++) {
      const profoptions = [];
      profoptions.push(<option value="default">Select Proficiency</option>);
      for (let prof of raceInfo.starting_proficiency_options.from) {
        profoptions.push(<option value={prof.index}>{prof.name}</option>);
      }
      totalProfOptions.push(
        <div>
          <select
            name="proficiency"
            id="proficiency-select"
            defaultValue={"default"}
          >
            {profoptions}
          </select>
          <br />
        </div>
      );
    }
  }

  const proficiencies = [];
  for (let proficiency of raceInfo.starting_proficiencies) {
    newProficienciesAndLanguages.push(proficiency.index);
    proficiencies.push(<li>{proficiency.name}</li>);
  }
  const traits = [];
  for (let trait of raceInfo.traits) {
    newFeatsAndTraits.push("traits/" + trait.index);
    traits.push(<li>{trait.name}</li>);
  }

  const abilitybonuses = [];
  for (let bonus of raceInfo.ability_bonuses) {
    newStats[statKey[bonus.ability_score.index]] += bonus.bonus;
    abilitybonuses.push(
      <li>
        {bonus.ability_score.name} +{bonus.bonus}
      </li>
    );
  }

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
                setLoaded(true);
                setRaceInfo(raceInfo);
              });
          }}
          defaultValue="default"
          name="races"
          id="race-select"
        >
          {races}
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
              {languagesoptions}
            </select>
          </div>
        )}
        {raceInfo.hasOwnProperty("starting_proficiency_options") && (
          <div>
            <label htmlFor="proficiency-select">
              Choose Bonus proficiencies:
              <br />
            </label>
            {totalProfOptions}
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

      {loaded && (
        <div id="raceDisplay">
          <div className="basicSection">
            Base Movement Speed: {raceInfo.speed}
          </div>
          <div className="basicSection">Size: {raceInfo.size}</div>
          <div className="basicSection">
            Ability Bonuses:
            {abilitybonuses}
          </div>
          <div className="basicSection">
            Starting Proficiencies:
            {proficiencies}
            <br />
          </div>
          <div className="basicSection">
            Traits:
            {traits}
          </div>
          <div className="basicSection">
            Languages:
            {languages}
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
