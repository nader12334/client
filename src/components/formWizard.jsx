import React, { useState, useEffect } from "react";
import Backstory from "./wizardViews/backstory";
import RollStats from "./wizardViews/rollStats";
import GatherInfo from "./wizardViews/gatherInfo";
import Congrats from "./wizardViews/Congrats"
import LogIn from "./wizardViews/login";
import CharacterSelect from "./wizardViews/CharacterList"
import JumpBack from "./wizardViews/jumpBackToList";

const FormWizard = ({ props }) => {
  const {
    name,
    characterDescription,
    username,
    setUsername,
    info,
    equipment,
    mainStats,
    speed,
    languageAndProficiencies,
    featuresAndTraits,
    attacksAndSpells,
    setInfo,
    setName,
    setCharacterDescription,
    setMainStats,
    setProficiencies,
    setLanguageAndProficiencies,
    setArmorClass,
    setSpeed,
    setAttacksAndSpells,
    setEquipment,
    setFeaturesAndTraits,
  } = props;

  const [view, setView] = useState(0);
  const [userId, setUserId] = useState(null);

  const wizardViews = [
    <LogIn userId={userId} setView={setView} setUserId={setUserId}/>,
    <Backstory props={{ setView, setCharacterDescription, setUsername, setName, userId,}} />,
    <RollStats props={{ setView, setMainStats, userId }} />,
    <GatherInfo
      props={{
        userId,
        equipment,
        info,
        mainStats,
        setEquipment,
        languageAndProficiencies,
        featuresAndTraits,
        setFeaturesAndTraits,
        setProficiencies,
        setSpeed,
        setView,
        setInfo,
        setLanguageAndProficiencies,
        setFeaturesAndTraits,
        setAttacksAndSpells,
        setMainStats,
      }}
    />,
    <Congrats props={{
      userId,
      setView,
      setUserId,
      name,
      characterDescription,
      username,
      info,
      equipment,
      mainStats,
      speed,
      languageAndProficiencies,
      featuresAndTraits,
      attacksAndSpells,
      setUserId,
    }}/>,
    <CharacterSelect userId={userId} sets={{
      userId,
      name,
      characterDescription,
      username,
      info,
      mainStats,
      languageAndProficiencies,
      speed,
      attacksAndSpells,
      featuresAndTraits,
      equipment,
      userId,
      setView,
      setName,
      setInfo,
      setUsername,
      setCharacterDescription,
      setMainStats,
      setLanguageAndProficiencies,
      setFeaturesAndTraits,
      setAttacksAndSpells,
      setEquipment,
      setSpeed,
    }}/>
  ]


  return <>
    <div id="formWizard">{wizardViews[view]}</div>
  </>
};

export default FormWizard;
