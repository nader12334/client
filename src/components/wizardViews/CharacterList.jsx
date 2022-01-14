import React from "react";
import { useEffect, useState } from "react";

const CharacterSelect = ({ userId, sets }) => {
  const {
    name,
    characterDescription,
    info,
    mainStats,
    languageAndProficiencies,
    armorClass,
    speed,
    attacksAndSpells,
    featuresAndTraits,
    equipment,
    setView,
    setName,
    setInfo,
    setCharacterDescription,
    setMainStats,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
    setAttacksAndSpells,
    setEquipment,
    setSpeed,
  } = sets;
  const [characters, setCharacters] = useState([]);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:8080/user/${userId}`, {
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setCharacters(data);
      });
  }, [refresh]);

  return (
    <div id="characterSelect">
      <div className="characterListSection">
        <strong>Character List:</strong>
        <br />
        {characters.map((n) => {
          return (
            <button
              className="submitCharacterButton"
              key={n.characterId}
              value={n.characterId}
              onClick={(e) => {
                fetch(`http://localhost:8080/char/${e.target.value}`, {
                  credentials: "include",
                })
                  .then((data) => data.json())
                  .then((data) => {
                    setName(data.name);
                    setInfo(data.info);
                    setCharacterDescription(data.characterDescription);
                    setMainStats(data.mainStats);
                    setLanguageAndProficiencies(data.languageAndProficiencies);
                    setFeaturesAndTraits(data.featuresAndTraits);
                    setAttacksAndSpells(data.attacksAndSpells);
                    setEquipment(data.equipment);
                    setSpeed(data.speed);
                  });
              }}
            >
              {n.characterName}
            </button>
          );
        })}
      </div>
      <br />
      <br />
      <div className="characterListSection">
        <strong>Save your character and come back Later:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();
            fetch("http://localhost:8080/char", {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: userId,
                name,
                characterDescription,
                info,
                mainStats,
                languageAndProficiencies,
                armorClass,
                speed,
                attacksAndSpells,
                featuresAndTraits,
                equipment,
              }),
            })
              .then((data) => data.json())
              .then(() => {
                alert("Character Saved");
                setRefresh(!refresh);
              });
          }}
        >
          Save Character
        </button>
        <br />
        <br />
      </div>
      <br />
      <br />
      <div className="characterListSection">
        <strong>Delete the currently selected character:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();
            fetch("http://localhost:8080/char", {
              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: userId,
                name,
                characterDescription,
                info,
                mainStats,
                languageAndProficiencies,
                armorClass,
                speed,
                attacksAndSpells,
                featuresAndTraits,
                equipment,
              }),
            })
              .then((data) => data.json())
              .then(() => {
                alert("Character Deleted");
                setRefresh(!refresh);
              });
          }}
        >
          Delete Character
        </button>
        <br />
        <br />
      </div>
      <br />
      <br />
      <div className="characterListSection">
        <strong>Start a new Character:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();

            setName("");
            setInfo({
              level: 0,
              class: {},
              Race: "",
              Background: "",
              "Experience Points": 0,
            });
            setCharacterDescription({
              "Player Name": "",
              personality: "",
              bonds: "",
              ideals: "",
              flaws: "",
              Alignment: "",
            });
            setMainStats({
              Strength: 8,
              Dexterity: 8,
              Constitution: 8,
              Intelligence: 8,
              Wisdom: 8,
              Charisma: 8,
            });
            setLanguageAndProficiencies([]);
            setFeaturesAndTraits([]);
            setAttacksAndSpells([]);
            setEquipment([
              { index: "cp", quantity: 0 },
              { index: "sp", quantity: 0 },
              { index: "ep", quantity: 0 },
              { index: "gp", quantity: 0 },
              { index: "pp", quantity: 0 },
            ]);
            setSpeed(0);
            setView(1);
          }}
        >
          Start New Character
        </button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default CharacterSelect;
