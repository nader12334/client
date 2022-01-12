import react from "react";

const Equipment = ({ equipment }) => {
  const equips = [];
  let key = 5
  for (const equip of equipment) {
    if (equip.index === "cp") {
      equips.push(<span key={0} id="cp">CP: {equip.quantity}</span>);
    } else if (equip.index === "sp") {
      equips.push(<span key={1} id="sp">SP: {equip.quantity}</span>);
    } else if (equip.index === "ep") {
      equips.push(<span key={2} id="ep">EP: {equip.quantity}</span>);
    } else if (equip.index === "gp") {
      equips.push(<span key={3} id="gp">GP: {equip.quantity}</span>);
    } else if (equip.index === "pp") {
      equips.push(<span key={4} id="pp">PP: {equip.quantity}</span>);
    } else {
      equips.push(
        <div key={key} className="equip">
          - {equip.index[0].toUpperCase() + equip.index.slice(1)} x
          {equip.quantity}
        </div>
      );
    }
    key += 1
  }

  return (
    <div id="equipmentContainer">
      <strong className="attribute">Equipment:</strong>
      {equips}
    </div>
  );
};

export default Equipment;
