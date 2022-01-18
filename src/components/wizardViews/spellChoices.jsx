import React, { useEffect, useState } from "react";
import JumpBack from "./jumpBackToList";

const SpellChoices = ({ props }) => {
  const { classChoice, setInfoViews, setAttacksAndSpells, setView, userId } = props;
  const [spells0, setSpells0] = useState([]);
  const [spells1, setSpells1] = useState([]);
  const [spellCount, setSpellCount] = useState(new Array(10).fill(0));
  const [levelFetched, setLevelFetched] = useState(false);
  const [currentSpell, setCurrentSpell] = useState([]);
  const [currentSpellDmg, setCurrentSpellDmg] = useState("");
  const [currentSpellClasses, setCurrentSpellClasses] = useState([]);
  useEffect(() => {
    fetch(
      `https://www.dnd5eapi.co/api/classes/${classChoice.toLowerCase()}/levels`
    )
      .then((data) => data.json())
      .then((levelInfo) => {
        const newSpellCount = [...spellCount];
        newSpellCount[0] = levelInfo[0].spellcasting.cantrips_known;
        newSpellCount[1] = levelInfo[0].spellcasting.spell_slots_level_1;

        setSpellCount(newSpellCount);
        setLevelFetched(true);
      });
  }, []);

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/spells?level=0`)
      .then((data) => data.json())
      .then((spells) => {
        setSpells0(spells.results);
      });
  }, [levelFetched]);

  useEffect(() => {
    fetch(`https://www.dnd5eapi.co/api/spells?level=1`)
      .then((data) => data.json())
      .then((spells) => {
        setSpells1(spells.results);
      });
  }, [levelFetched]);


  const spellbookSelections = [];
  if (classChoice === "Wizard") {
    for (let i = 0; i < 6; i++) {
      const options = [];
      options.push(
        <option value="default" disabled>
          select
        </option>
      );

      for (let spell of spells1) {
        options.push(<option value={spell.index}>{spell.name}</option>);
      }

      spellbookSelections.push(
        <select
          onChange={(e) => {
            fetch(`https://www.dnd5eapi.co/api/spells/${e.target.value}`)
              .then((data) => data.json())
              .then((info) => {
                setCurrentSpell([info.name, info.desc]);
                setCurrentSpellClasses(info.classes.map((n) => n.name));
                if (info.hasOwnProperty("damage")) {
                  if (info.damage.hasOwnProperty("damage_at_slot_level")) {
                    setCurrentSpellDmg(
                      info.damage.damage_at_slot_level["1"] +
                        " " +
                        info.damage.damage_type.name
                    )
                  } else {
                    setCurrentSpellDmg(
                      info.damage.damage_at_character_level["1"] +
                        " " +
                        info.damage.damage_type.name
                    );
                  }
                } else {
                  setCurrentSpellDmg("None");
                }
              });
          }}
          id="spellbook-select"
          defaultValue="default"
        >
          {options}
        </select>
      );
    }
  }

  const cantripSelections = [];
  for (let i = 0; i < spellCount[0]; i++) {
    const options = [];
    options.push(
      <option value="default" disabled>
        select
      </option>
    );

    for (let spell of spells0) {
      options.push(<option value={spell.index}>{spell.name}</option>);
    }

    cantripSelections.push(
      <select
        onChange={(e) => {
          fetch(`https://www.dnd5eapi.co/api/spells/${e.target.value}`)
            .then((data) => data.json())
            .then((info) => {
              setCurrentSpell([info.name, info.desc]);
              if (info.hasOwnProperty("damage")) {
                if (info.damage.hasOwnProperty("damage_at_slot_level")) {
                  setCurrentSpellDmg(
                    info.damage.damage_at_slot_level["1"] +
                      " " +
                      info.damage.damage_type.name
                  );
                } else {
                  setCurrentSpellDmg(
                    info.damage.damage_at_character_level["1"] +
                      " " +
                      info.damage.damage_type.name
                  );
                }
              } else {
                setCurrentSpellDmg("None");
              }
              setCurrentSpellClasses(info.classes.map((n) => n.name));
            });
        }}
        id="cantrip-select"
        defaultValue="default"
      >
        {options}
      </select>
    );
  }

  return (
    <div id="spellChoices">
      {userId ? <JumpBack setView={setView} /> : null}
      <form>
        {classChoice === "Wizard" && (
          <div>
            <em>You really did pick the best class, I should know!</em>
            <div>This is your very first Spellbook!</div>
            <div>Choose 6 Spells to store in your spellbook</div>
            <div>
              You will be able to prepare a portion of them before each day
              begins.
            </div>
            {spellbookSelections}
          </div>
        )}
        <div>
          <div>
            All Spellcasters know a few cantrips, this is your bread and butter.
          </div>
          <div>Choose your Cantrips</div>
          {cantripSelections}
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            let current = 0;
            const allSpells = [];
            while (e.target.form[current]) {
              if (e.target.form[current].id === "cantrip-select") {
                allSpells.push("cantrip:" + e.target.form[current].value);
              } else if (e.target.form[current].id === "spellbook-select") {
                allSpells.push("spellbook:" + e.target.form[current].value);
              }
              if (e.target.form[current].value === "default") {
                alert("Please make all selections!");
                break;
              }
              if (e.target.form[current].value !== "") {
                setAttacksAndSpells(allSpells);
                setInfoViews(3);
              }
              current++;
            }
          }}
        >
          Submit
        </button>
      </form>
      {currentSpellClasses.length > 0 && (
        <div className="basicSection">
          <strong>Classes that can use this spell: </strong>
          {currentSpellClasses.map((n) => (
            <div>{n}</div>
          ))}
          <strong>
            <br />
            Currently Selected Spell:
          </strong>
          <br />
          <strong>Damage at level 1: </strong>
          <div>{currentSpellDmg}</div>
          <br />
          <strong>{currentSpell[0]}:</strong>
          <br />

          <div>{currentSpell[1]}</div>
        </div>
      )}
    </div>
  );
};

export default SpellChoices;
