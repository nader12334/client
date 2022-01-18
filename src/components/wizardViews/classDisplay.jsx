import { useState, useEffect } from "react";
import JumpBack from "./jumpBackToList";
import axios from "axios"

const ClassDisplay = ({ props }) => {
  const [classList, setClassList] = useState([]);
  const [classInfo, setClassInfo] = useState(false);

  const {
    userId,
    equipment,
    setView,
    setEquipment,
    setClassChoice,
    languageAndProficiencies,
    featuresAndTraits,
    setInfoViews,
    setLanguageAndProficiencies,
  } = props;

  const newProficiencies = [...languageAndProficiencies];
  const newEquipment = [...equipment];
  const [newFeatsAndTraits, setNewFeatsAndTraits] = useState([]);
  
  const equipmentSelections = [];
  if (classInfo.hasOwnProperty("starting_equipment_options")) {
    let n = 0
    for (let block of classInfo.starting_equipment_options) {
      for (let i = 0; i < block.choose; i++) {
        let subBlock = [];
        subBlock.push(
          <option key={n} value="default" disabled>
            select
          </option>
        );
        n++
  
        for (let equip of block.from) {
          if (equip.hasOwnProperty("equipment")) {
            subBlock.push(
              <option key={n} value={equip.equipment.index + "," + equip.quantity}>
                {equip.equipment.name} x{equip.quantity}
              </option>
            );
            n++
          } else if (equip.hasOwnProperty("equipment_option")) {
            subBlock.push(
              <option
                key={n}
                value={
                  equip.equipment_option.from.equipment_category.index +
                  "," +
                  equip.equipment_option.choose
                }
              >
                Pick {equip.equipment_option.choose} from{" "}
                {equip.equipment_option.from.equipment_category.name}
              </option>
            );
            n++
          } else if (equip.hasOwnProperty("equipment_category")) {
            subBlock.push(
              <option key={n} value={equip.equipment_category.index + "," + block.choose}>
                Pick {block.choose} from {equip.equipment_category.name}
              </option>
            );
            n++
          } else {
            let str = "";
            const indices = [];
            for (let equipOption in equip) {
              if (equip[equipOption].hasOwnProperty("equipment")) {
                str += equip[equipOption].quantity + " ";
                if (Number(equip[equipOption].quantity) > 1) {
                  str += equip[equipOption].equipment.name + "s, and ";
                  indices.push(
                    equip[equipOption].equipment.index +
                      "," +
                      equip[equipOption].quantity
                  );
                } else {
                  str += equip[equipOption].equipment.name + ", and ";
                  indices.push(
                    equip[equipOption].equipment.index +
                      "," +
                      equip[equipOption].quantity
                  );
                }
              } else {
                str += equip[equipOption].equipment_option.choose + " from ";
                if (equip[equipOption].equipment_option.choose > 1) {
                  str +=
                    equip[equipOption].equipment_option.from.equipment_category
                      .name + "s, and ";
                  indices.push(
                    equip[equipOption].equipment_option.from.equipment_category
                      .index +
                      "," +
                      equip[equipOption].equipment_option.choose
                  );
                } else {
                  str +=
                    equip[equipOption].equipment_option.from.equipment_category
                      .name + ", and ";
                  indices.push(
                    equip[equipOption].equipment_option.from.equipment_category
                      .index +
                      "," +
                      equip[equipOption].equipment_option.choose
                  );
                }
              }
            }
            str = str.slice(0, -6);
            subBlock.push(<option key={n} value={indices}>{str}</option>);
            n++
          }
        }
        equipmentSelections.push(
          <div>
            <select key={n} id="equip-select" defaultValue="default">
              {subBlock}
            </select>
          </div>
        );
        n++
      }
    }
  }

  useEffect(() => {
    axios.get("https://www.dnd5eapi.co/api/classes")
      .then(({data}) => {
        setClassList(data.results);
      });
  }, []);

  useEffect(() => {
    if (classInfo) {
      axios.get(`https://www.dnd5eapi.co/api/classes/${classInfo.index}/levels`)
        .then(({data}) => {
          const temp = [];
          for (let feat in data[0].features) {
            temp.push("features/" + data[0].features[feat].index);
          }
          setNewFeatsAndTraits([...temp, ...featuresAndTraits]);
        });
    }
  }, [classInfo, featuresAndTraits]);

  return (
    <div id="classView">
      {userId ? <JumpBack setView={setView} /> : null}
      <div>
        Choose what class your character will be. <br />
        Below you can see all the information for each class.
      </div>
      <br />
      <form>
        <label htmlFor="class-select">Choose a class:</label>
        <select
          onChange={(e) => {
            axios.get(`https://www.dnd5eapi.co/api/classes/${e.target.value}`)
              .then(({data}) => setClassInfo(data));
          }}
          defaultValue="default"
          name="classes"
          id="class-select"
        >
        <option value="default">Select a Class</option>
        {classList.map((option, idx) => <option key={idx} value={option.index}>{option.name}</option>)}
        </select>
        {classInfo && (
          <div>
            <label htmlFor="proficiency-select">
              Choose Bonus proficiencies:
            </label>
            {classInfo.proficiency_choices.map((block, idx) => 
              <div key={idx}>
                  {
                  new Array(block.choose).fill(0).map((subBlock, idx) =>
                    <select key={idx} id="proficiency-select" defaultValue="default">
                      <option value="default" disabled>select</option>
                      {block.from.map((prof, idx) => !newProficiencies.includes(prof.index) ? (<option key={idx} value={prof.index}>{prof.name}</option>) : null)}
                    </select>
                    )
                  }
              </div>)}
          </div>
        )}
        <br />
        {classInfo && (
          <div>
            <label htmlFor="equipment-select">
              Choose your extra Equipment:
            </label>
            {equipmentSelections}
          </div>
        )}
        <br />
        {
          <button
            onClick={(e) => {
              e.preventDefault();
              let startingClass = e.target.form[0].selectedOptions[0].text;
              if (startingClass === "Barbarian") {
                newEquipment[3].quantity = 50;
              } else if (startingClass === "Monk") {
                newEquipment[3].quantity = 13;
              } else if (startingClass === "Sorcerer") {
                newEquipment[3].quantity = 75;
              } else if (
                startingClass === "Rogue" ||
                startingClass === "Warlock" ||
                startingClass === "Wizard"
              ) {
                newEquipment[3].quantity = 100;
              } else {
                newEquipment[3].quantity = 125;
              }

              let current = 0;
              while (e.target.form[current]) {
                if (e.target.form[current].id === "proficiency-select") {
                  newProficiencies.push(e.target.form[current].value);
                } else if (e.target.form[current].id === "equip-select") {
                  const items = e.target.form[current].value.split(",");
                  while (items.length > 0) {
                    const itemObj = {};
                    itemObj.quantity = Number(items.pop());
                    itemObj.index = items.pop();
                    newEquipment.push(itemObj);
                  }
                }
                if (e.target.form[current].value === "default") {
                  alert("Please make all selections!");
                  break;
                }
                if (e.target.form[current].value !== "") {
                  setClassChoice(startingClass);
                  setEquipment(newEquipment);
                  setLanguageAndProficiencies(newProficiencies);
                  if (
                    classInfo.hasOwnProperty("spellcasting") &&
                    startingClass !== "Ranger" &&
                    startingClass !== "Paladin"
                  ) {
                    setInfoViews(2);
                  } else {
                    setInfoViews(3);
                  }
                }
                current++;
              }
            }}
          >
            Submit
          </button>
        }
      </form>
      {classInfo && (
        <div id="classDisplay">
          <strong>Basic Information: </strong>
          <br />
          <div key={0} className="basicSection">
            <strong>Base "HitDice": </strong>
            {classInfo.hit_die}
            <br />
            Your Characters total health will be a approximately 1 of your "Hit
            Dice" + your Level multiplied by your Constitution Modifier + the
            average role of your "Hit Dice"
          </div>
          <div key={1} className="basicSection">
            <strong>Proficiencies:</strong>
            {
              classInfo.proficiencies.map((prof, idx) => {
                newProficiencies.push(prof.index);
                return <div key={idx}>{prof.name}</div>
              })
            }
          </div>
          <div key={2} className="basicSection">
            <strong>Features:</strong>
            {
              newFeatsAndTraits.map((feat, idx) => {
                if (feat.slice(0, 9) === "features/") {
                  return (<div key={idx}>{feat[9].toUpperCase() + feat.slice(10)}</div>)
                }  else return null
              })
            }
          </div>
          <div key={3} className="basicSection">
            <strong>Starting Equipment:</strong>
            {classInfo.starting_equipment.map((equip, idx) => {
                newEquipment.push({
                  index: equip.equipment.index,
                  quantity: equip.quantity,
                })
                return <div key={idx}>{equip.equipment.name} x{equip.quantity}</div>
            })}
          </div>
          <div key={4} className="basicSection">
            <strong>Saving Throws: </strong>
            {classInfo.saving_throws.map((save, idx) => {
              newProficiencies.push(save.index);
              return(<div key={idx}>{save.name}</div>);
            })}
          </div>
          {classInfo.hasOwnProperty("spellcasting") && (
            <div key={5} className="basicSection">
              <strong>SpellCaster Information:</strong>
              <br />
              <br />
              <strong>Main Spell Stat: </strong>
              {classInfo.spellcasting.spellcasting_ability.name}
              {classInfo.spellcasting.info.map((desc, idx) => (
                <div key={idx}>
                  <br />
                  <strong>{desc.name}: </strong>
                  <li>{desc.desc}</li>
                  <br />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassDisplay;
