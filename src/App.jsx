import { useState, useEffect } from "react";
import MainStats from "./components/mainstats";
import Skills from "./components/skills";
import OtherInfo from "./components/otherinfo";
import ExtraProficiencies from "./components/extraproficiencies";
import CombatStats from "./components/combatstats";
import FormWizard from "./components/formWizard";
import CharacterBackstory from "./components/characterbackstory";
import FeatsAndTraits from "./components/featsandtraits";
import Equipment from "./components/equipment";
import Attacks from "./components/Attacks";

function App() {
  const [name, setName] = useState('')
  const [characterDescription, setCharacterDescription] = useState({
    "Player Name": "",
    personality: "",
    bonds: "",
    ideals: "",
    flaws: "",
    Alignment: "",
  });
  const [info, setInfo] = useState({
    level: 0,
    class: {},
    Race: "",
    Background: "",
    "Experience Points": 0,
  });
  const [mainStats, setMainStats] = useState({
    Strength: 8,
    Dexterity: 8,
    Constitution: 8,
    Intelligence: 8,
    Wisdom: 8,
    Charisma: 8,
  });
  const [armorClass, setArmorClass] = useState(10);
  const [speed, setSpeed] = useState(0);
  const [languageAndProficiencies, setLanguageAndProficiencies] = useState([]);
  const [featuresAndTraits, setFeaturesAndTraits] = useState([]);
  const [equipment, setEquipment] = useState([
    { index: "cp", quantity: 0 },
    { index: "sp", quantity: 0 },
    { index: "ep", quantity: 0 },
    { index: "gp", quantity: 0 },
    { index: "pp", quantity: 0 },
  ]);
  const [attacksAndSpells, setAttacksAndSpells] = useState([]);

  return (
    <div id="app">
      <div id="characterSheet">
        <div id="information">
          <div id="characterName">
            <span>{name}</span>
            <span className="secondaryText">Character Name</span>
          </div>
          <OtherInfo info={info} description={characterDescription} />
        </div>
        <div id="stats-skills-saves">
          <MainStats mainStats={mainStats} />
          <Skills
            languageAndProficiencies={languageAndProficiencies}
            info={info}
            mainStats={mainStats}
          />
        </div>
        <ExtraProficiencies
          props={{ languageAndProficiencies, mainStats, info }}
        />
        <CombatStats
          props={{ armorClass, speed, mainStats, info }}
        />
        <CharacterBackstory props={{ characterDescription }} />
        <FeatsAndTraits props={{ featuresAndTraits }} />
        <Equipment equipment={equipment} />
        <Attacks
          attacksAndSpells={attacksAndSpells}
          equipment={equipment}
          mainStats={mainStats}
        />
      </div>
      <FormWizard
        props={{
          name,
          characterDescription,
          info,
          equipment,
          mainStats,
          speed,
          armorClass,
          languageAndProficiencies,
          featuresAndTraits,
          attacksAndSpells,
          setArmorClass,
          setName,
          setInfo,
          setCharacterDescription,
          setMainStats,
          setLanguageAndProficiencies,
          setFeaturesAndTraits,
          setAttacksAndSpells,
          setEquipment,
          setSpeed,
        }}
      />
      </div>
  )
}

export default App
