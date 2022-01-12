import React, { useEffect, useState } from "react";

const FeatsAndTraits = ({ props }) => {
  const { featuresAndTraits } = props;
  const [details, setDetails] = useState([]);
  const getDetailedTraits = async (featuresAndTraits) => {
    let traitlist = [];
    for (let trait of featuresAndTraits) {
      const data = await fetch(`https://www.dnd5eapi.co/api/${trait}`);
      const traitDetails = await data.json();
      traitlist.push({
        name: traitDetails.name,
        details: traitDetails.desc[0],
      });
    }
    return traitlist;
  };

  useEffect(async () => {
    const detailedList = await getDetailedTraits(featuresAndTraits);
    setDetails(detailedList);
  }, [featuresAndTraits]);

  const divs = [];
  let key = 0
  for (let detail of details) {
    divs.push(
      <div key={key}>
        <br />
        <strong>{detail.name}:</strong>
        <br />
        <span>{detail.details}</span>
      </div>
    );
    key+=1
  }

  return (
    <div id="featsAndTraits">
      <strong className="attribute">Feats and Traits:</strong>
      {divs}
    </div>
  );
};

export default FeatsAndTraits;
