import react from "react";
import { useEffect, useState } from "react";

const Attacks = ({ attacksAndSpells, equipment, mainStats }) => {
  const [damagingWeapons, setDamagingWeapons] = useState([]);

  const dexMod = Math.floor((mainStats.Dexterity - 10) / 2);
  const strMod = Math.floor((mainStats.Strength - 10) / 2);

  const getWeaponDetails = async (item) => {
    const data = await fetch(
      `https://www.dnd5eapi.co/api/equipment/${item.index}`
    );
    const weapon = await data.json();
    const wep = {};
    if (weapon.hasOwnProperty("damage")) {
      wep.name = weapon.name;
      wep.damage =
        weapon.damage.damage_dice + " " + weapon.damage.damage_type.name;
      wep.range = weapon.weapon_range;
      return wep;
    } else return null;
  };

  useEffect(async () => {
    const weapons = [];
    for (const weapon of equipment) {
      if (weapon.index === 'cp' || weapon.index === 'sp' || weapon.index === 'ep' || weapon.index === 'gp' || weapon.index === 'pp'){
        continue;
      } else {
        const wepdetail = await getWeaponDetails(weapon);
        if (wepdetail !== null) {
          weapons.push(wepdetail);
        }
      }
    }
    setDamagingWeapons(weapons);
  }, [equipment]);

  return (
    <div id="attacks">
      <strong className="attribute">Weapon Attacks</strong>
      <div id="weaponChoices">
        {damagingWeapons.map((weapon, idx) => {
          return (
            <div key={idx} className="wepDetails">
              <div className="wepDetail">{weapon.name}</div>
              {weapon.range === "Melee" && (
                <div className="wepDetail">
                  ({weapon.range[0]}): {strMod > -1 && '+'}{strMod} (STR)
                </div>
              )}
              {weapon.range === "Ranged" && (
                <div className="wepDetail">
                  ({weapon.range[0]}): {dexMod > -1 && '+'}{dexMod} (DEX)
                </div>
              )}
              <div className="wepDetail">{weapon.damage}</div>
            </div>
          );
        })}
      </div>
      <strong className="attribute">Cantrips: </strong>
      {attacksAndSpells.map((attack) => {
        if (attack.slice(0, 7) === "cantrip") {
          return <span>{attack[8].toUpperCase() + attack.slice(9)}</span>;
        }
      })}
      <br />
      <strong className="attribute">Spells:</strong>
      {attacksAndSpells.map((attack, key) => {
        if (attack.slice(0, 9) === "spellbook") {
          return (
            <span key={key}>
              <strong>Spellbook: </strong>
              {attack[10].toUpperCase() + attack.slice(11)}
            </span>
          );
        }
      })}
    </div>
  );
};

export default Attacks;
