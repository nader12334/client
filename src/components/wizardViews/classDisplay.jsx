import react, { useState, useEffect } from "react";
import JumpBack from "./jumpBackToList";

const ClassDisplay = ({ props }) => {
  const [classList, setClassList] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [classInfo, setClassInfo] = useState({
    index: "",
    name: "",
    proficiency_choices: [],
    proficiencies: [],
    saving_throws: [],
    starting_equipment: [],
    starting_equipment_options: [],
  });

  const {
    equipment,
    setView,
    setEquipment,
    setClassChoice,
    languageAndProficiencies,
    featuresAndTraits,
    setInfoViews,
    mainStats,
    setProficiencies,
    setLanguageAndProficiencies,
    setFeaturesAndTraits,
  } = props;
  const newProficiencies = [...languageAndProficiencies];
  const newEquipment = [...equipment];
  const [newFeatsAndTraits, setNewFeatsAndTraits] = useState([]);
  useEffect(() => {
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((data) => data.json())
      .then((classlist) => {
        setClassList(classlist.results);
      });
  }, []);

  const classes = [];
  classes.push(
    <option value="default" disabled>
      Select your Class
    </option>
  );
  for (const option of classList) {
    classes.push(<option value={option.index}>{option.name}</option>);
  }
  const savingthrows = [];
  for (let save of classInfo.saving_throws) {
    newProficiencies.push(save.index);
    savingthrows.push(<div>{save.name}</div>);
  }
  const proficiencies = [];
  for (let prof of classInfo.proficiencies) {
    newProficiencies.push(prof.index);
    proficiencies.push(<div>{prof.name}</div>);
  }
  const equips = [];
  for (let equip of classInfo.starting_equipment) {
    newEquipment.push({
      index: equip.equipment.index,
      quantity: equip.quantity,
    });
    equips.push(
      <div>
        {equip.equipment.name} x{equip.quantity}
      </div>
    );
  }

  const proficiencySelections = [];
  for (let block of classInfo.proficiency_choices) {
    for (let i = 0; i < block.choose; i++) {
      let subBlock = [];
      subBlock.push(
        <option value="default" disabled>
          select
        </option>
      );
      for (let prof of block.from) {
        if (!newProficiencies.includes(prof.index)) {
          subBlock.push(<option value={prof.index}>{prof.name}</option>);
        }
      }
      proficiencySelections.push(
        <div>
          <select id="proficiency-select" defaultValue="default">
            {subBlock}
          </select>
        </div>
      );
    }
  }
  const equipmentSelections = [];
  for (let block of classInfo.starting_equipment_options) {
    for (let i = 0; i < block.choose; i++) {
      let subBlock = [];
      subBlock.push(
        <option value="default" disabled>
          select
        </option>
      );

      for (let equip of block.from) {
        if (equip.hasOwnProperty("equipment")) {
          subBlock.push(
            <option value={equip.equipment.index + "," + equip.quantity}>
              {equip.equipment.name} x{equip.quantity}
            </option>
          );
        } else if (equip.hasOwnProperty("equipment_option")) {
          subBlock.push(
            <option
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
        } else if (equip.hasOwnProperty("equipment_category")) {
          subBlock.push(
            <option value={equip.equipment_category.index + "," + block.choose}>
              Pick {block.choose} from {equip.equipment_category.name}
            </option>
          );
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
          subBlock.push(<option value={indices}>{str}</option>);
        }
      }
      equipmentSelections.push(
        <div>
          <select id="equip-select" defaultValue="default">
            {subBlock}
          </select>
        </div>
      );
    }
  }

  const spellcastingInformation = [];
  if (classInfo.hasOwnProperty("spellcasting")) {
    for (let desc of classInfo.spellcasting.info) {
      spellcastingInformation.push(
        <div>
          <br />
          <strong>{desc.name}: </strong>
          <li>{desc.desc}</li>
          <br />
        </div>
      );
    }
  }

  useEffect(() => {
    if (classInfo.index.length) {
      fetch(`https://www.dnd5eapi.co/api/classes/${classInfo.index}/levels`)
        .then((data) => data.json())
        .then((info) => {
          const temp = [];
          for (let feat in info[0].features) {
            temp.push("features/" + info[0].features[feat].index);
          }
          setNewFeatsAndTraits([...temp, ...featuresAndTraits]);
        });
    }
  }, [classInfo]);

  const feats = [];
  for (let feat of newFeatsAndTraits) {
    if (feat.slice(0, 9) === "features/") {
      feats.push(<div>{feat[9].toUpperCase() + feat.slice(10)}</div>);
    }
  }

  return (
    <div id="classView">
      <JumpBack setView={setView}/>
      <div>
        Choose what class your character will be. <br />
        Below you can see all the information for each class.
      </div>
      <br />
      <form>
        <label htmlFor="class-select">Choose a class:</label>
        <select
          onChange={(e) => {
            fetch(`https://www.dnd5eapi.co/api/classes/${e.target.value}`)
              .then((data) => data.json())
              .then((classInfo) => {
                setLoaded(true);
                setClassInfo(classInfo);
              });
          }}
          defaultValue="default"
          name="classes"
          id="class-select"
        >
          {classes}
        </select>
        {classInfo.proficiency_choices.length !== 0 && (
          <div>
            <label htmlFor="proficiency-select">
              Choose Bonus proficiencies:
            </label>
            {proficiencySelections}
          </div>
        )}
        <br />
        {classInfo.starting_equipment_options.length !== 0 && (
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
                  const items = e.target.form[current].value.split(",")
                  while (items.length > 0){
                    const itemObj = {}
                    itemObj.quantity = Number(items.pop())
                    itemObj.index = items.pop()
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
                  if (classInfo.hasOwnProperty("spellcasting") && startingClass !== 'Ranger' && startingClass !== 'Paladin') {
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
      {loaded && (
        <div id="classDisplay">
          <strong>Basic Information: </strong>
          <br />
          <div className="basicSection">
            <strong>Base "HitDice": </strong>
            {classInfo.hit_die}
            <br />
            Your Characters total health will be a approximately 1 of your "Hit
            Dice" + your Level multiplied by your Constitution Modifier + the
            average role of your "Hit Dice"
          </div>
          <div className="basicSection">
            <strong>Proficiencies:</strong>
            {proficiencies}
          </div>
          <div className="basicSection">
            <strong>Features:</strong>
            {feats}
          </div>
          <div className="basicSection">
            <strong>Starting Equipment:</strong>
            {equips}
          </div>
          <div className="basicSection">
            <strong>Saving Throws: </strong>
            {savingthrows}
          </div>
          {classInfo.hasOwnProperty("spellcasting") && (
            <div className="basicSection">
              <strong>SpellCaster Information:</strong>
              <br />
              <br />
              <strong>Main Spell Stat: </strong>
              {classInfo.spellcasting.spellcasting_ability.name}
              {spellcastingInformation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClassDisplay;
