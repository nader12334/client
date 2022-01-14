import React from "react";

const OtherInfo = (props) => {
  const { info, description, username } = props;
  const divs = [];
  const fields = [
    "Class & Level",
    "Alignment",
    "experience",
    "Background",
    "Race",
  ];

  let idx = 0;
  divs.push(
    <div key={idx} className="infoBlock">
      <span>{username}</span>
      <span className="secondaryText">Username</span>
    </div>
  )
  for (let field of fields) {
    if (field === "Class & Level") {
      const spans = [];
      for (let job of info.jobs) {
        let th = "";
        if (job.level === 1) {
          th = "st";
        } else if (job.level === 2) {
          th = "nd";
        } else if (job.level === 3) {
          th = "rd";
        } else th = "th";
        spans.push(<span key={idx}>{job.level + th + " level " + job.class}</span>);
        idx += 1
      }
      divs.push(
        <div key={idx} className="infoBlock">
          {spans}
          <span className="secondaryText">{field}</span>
        </div>
      );
      idx += 1
    } else if (field === "Alignment") {
      divs.push(
        <div key={idx} className="infoBlock">
          <span>{description[field]}</span>
          <span className="secondaryText">Player Name</span>
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
