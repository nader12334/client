import React from "react";

const OtherInfo = (props) => {
  const { info, description } = props;
  const divs = [];
  const fields = [
    "Class & Level",
    "Alignment",
    "Experience Points",
    "Player Name",
    "Background",
    "Race",
  ];

  let idx = 0;
  for (let field of fields) {
    if (field === "Class & Level") {
      const spans = [];
      for (let job in info.class) {
        let th = "";
        if (info.class[job] === 1) {
          th = "st";
        } else if (info.class[job] === 2) {
          th = "nd";
        } else if (info.class[job] === 3) {
          th = "rd";
        } else th = "th";
        spans.push(<span key={idx}>{info.class[job] + th + " level " + job}</span>);
        idx += 1
      }
      divs.push(
        <div key={idx} className="infoBlock">
          {spans}
          <span className="secondaryText">{field}</span>
        </div>
      );
      idx += 1
    } else if (field === "Player Name" || field === "Alignment") {
      divs.push(
        <div key={idx} className="infoBlock">
          <span>{description[field]}</span>
          <span className="secondaryText">{field}</span>
        </div>
      );
      idx += 1
    } else {
      divs.push(
        <div key={idx} className="infoBlock">
          <span>{info[field]}</span>
          <span className="secondaryText">{field}</span>
        </div>
      );
      idx += 1
    }
    idx += 1;
  }
  return <div id="otherInfo">{divs}</div>;
};

export default OtherInfo;
