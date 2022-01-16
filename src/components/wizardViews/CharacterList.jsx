import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const CharacterSelect = ({ userId, sets }) => {
  const {
    name,
    characterDescription,
    username,
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
    setUsername,
    setMainStats,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
    setAttacksAndSpells,
    setEquipment,
    setSpeed,
  } = sets;

  const [characters, setCharacters] = useState([]);
  
  // On mount generate list of characters with click event
  useEffect(() => {
    axios
      .post(`http://localhost:8080/graphql`, {
        query: `query($username: String) {
        getUserByUsername(username: $username) {
          username
          characterSheets {
            id
            name
          }
        }
      }`,
        variables: {
          username: userId,
        },
      })
      .then(({data}) => {
        const { characterSheets } = data.data.getUserByUsername;
        setCharacters(characterSheets);
      });
  }, [userId]);

  return (
    <div id="characterSelect">
      {/* Generate Character List */}
      <div key={0} className="characterListSection">
        <strong>Character List:</strong>
        <br />
        {characters.map((n) => {
          return (
            <button
              className="submitCharacterButton"
              key={n.id}
              value={n.id}
              onClick={(e) => {
                axios.post(`http://localhost:8080/graphql`, {
                  query: `query($id: ID) {
                            getCharById(id: $id) {
                              name
                              username
                              characterDescription {
                                personality
                                bonds
                                ideals
                                flaws
                                Alignment
                              }
                              info {
                                level
                                jobs {
                                  class
                                  level
                                }
                                Race
                                Background
                                experience
                              }
                              mainStats {
                                Strength
                                Dexterity
                                Constitution
                                Intelligence
                                Wisdom
                                Charisma
                              }
                              languageAndProficiencies
                              armorClass
                              speed
                              attacksAndSpells
                              featuresAndTraits
                              equipment {
                                index
                                quantity
                              }
                            }
                          }`,
                  variables: {
                    id: e.target.value,
                  },
                })
                  .then(({ data }) => {
                    const char = data.data.getCharById;
                    setName(char.name);
                    setUsername(char.username);
                    setCharacterDescription(char.characterDescription);
                    setInfo(char.info);
                    setMainStats(char.mainStats);
                    setLanguageAndProficiencies(char.languageAndProficiencies);
                    setFeaturesAndTraits(char.featuresAndTraits);
                    setAttacksAndSpells(char.attacksAndSpells);
                    setEquipment(char.equipment);
                    setSpeed(char.speed);
                  });
              }}
            >
              {n.name}
            </button>
          );
        })}
      </div>
      <br />
      <br />
      {/* Save a Character */}
      <div key={1} className="characterListSection">
        <strong>Save your character and come back Later:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();
            axios.post("http://localhost:8080/graphql", {
              query: `mutation($characterSheet: SheetInput, $user: UserInput) {
                saveSheet(characterSheet: $characterSheet, user: $user) {
                  id
                  name
                }
              }`,
              variables: {
                user: {
                  username: userId,
                },
                characterSheet: {
                  name,
                  username: userId,
                  characterDescription,
                  info,
                  mainStats,
                  languageAndProficiencies,
                  armorClass,
                  speed,
                  attacksAndSpells,
                  featuresAndTraits,
                  equipment,
                },
              },
            })
              .then(({data}) => {
                const {saveSheet} = data.data
                if(saveSheet){
                  let exists = false
                  for (const char of characters){
                    if (char.name === saveSheet.name) {
                      exists = true
                      break;
                    }
                  }
                  if (!exists) {
                    const newCharacters = [...characters]
                    newCharacters.push(saveSheet)
                    setCharacters(newCharacters)
                  }
                } else alert("Error Saving Character")
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
      {/* Delete a Character */}
      <div key={2} className="characterListSection">
        <strong>Delete the currently selected character:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();
            axios.post("http://localhost:8080/graphql", {
              query: `
                mutation($characterSheet: SheetInput, $user: UserInput) {
                  deleteSheet(characterSheet: $characterSheet, user: $user) {
                    characterSheets {
                      id
                      name
                    }
                  }
                }`,
              variables: {
                user: {
                  username: userId,
                },
                characterSheet: {
                  name,
                  username,
                },
              },
            })
              .then(({data}) => {
                const {deleteSheet} = data.data
                if(deleteSheet){
                  setCharacters(deleteSheet.characterSheets)
                } else alert("Error Deleting Character")
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
      {/* Reset Character Creator */}
      <div key={3} className="characterListSection">
        <strong>Start a new Character:</strong>
        <br />
        <button
          className="submitCharacterButton"
          onClick={(e) => {
            e.preventDefault();

            setName("");
            setInfo({
              level: 0,
              jobs: [],
              Race: "",
              Background: "",
              experience: 0,
            });
            setUsername("");
            setCharacterDescription({
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
