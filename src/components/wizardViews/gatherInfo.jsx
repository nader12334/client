import react, { useEffect, useState } from "react";
import RaceDisplay from "./raceDisplay";
import ClassDisplay from "./classDisplay";
import GatherInfoFinal from "./gatherInforFinal";
import SpellChoices from "./spellChoices";

const GatherInfo = ({ props }) => {
  const {
    setAttacksAndSpells,
    mainStats,
    info,
    languageAndProficiencies,
    featuresAndTraits,
    setProficiencies,
    setSpeed,
    setView,
    setInfo,
    equipment,
    setEquipment,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
    setMainStats,
  } = props;
  const [infoViews, setInfoViews] = useState(0);
  const [race, setRace] = useState("");
  const [classChoice, setClassChoice] = useState("");

  const infoView = [
    <RaceDisplay
      props={{
        setRace,
        mainStats,
        setProficiencies,
        setSpeed,
        setInfoViews,
        setInfo,
        setView,
        setLanguageAndProficiencies,
        setFeaturesAndTraits,
        setMainStats,
      }}
    />,
    <ClassDisplay
      props={{
        equipment,
        setClassChoice,
        setEquipment,
        languageAndProficiencies,
        featuresAndTraits,
        setInfoViews,
        mainStats,
        setProficiencies,
        setLanguageAndProficiencies,
        setFeaturesAndTraits,
      }}
    />,
    <SpellChoices
      props={{
        classChoice,
        setInfoViews,
        featuresAndTraits,
        setAttacksAndSpells,
        setFeaturesAndTraits,
      }}
    />,
    <GatherInfoFinal
      props={{
        info,
        setView,
        setInfo,
        race,
        classChoice,
        setLanguageAndProficiencies,
        languageAndProficiencies,
        setView,
      }}
    />,
  ];

useEffect(() => {
  setInfoViews(0)
}, [])

  return <div>{infoView[infoViews]}</div>;
};

export default GatherInfo;
