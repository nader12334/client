import React from "react";
import JumpBack from "./jumpBackToList";

const Backstory = ({ props }) => {
  const { setView, setCharacterDescription, setUsername, setName, userId } = props;

  return (
    <div className="wizardView">
      {userId ? <JumpBack setView={setView} /> : null}
      <strong>Let's get some of your character's story to start</strong>
      <br />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let morals, lawful;
          if (e.target[6].checked) lawful = e.target[6].value;
          if (e.target[7].checked) lawful = e.target[7].value;
          if (e.target[8].checked) lawful = e.target[8].value;
          if (e.target[9].checked) morals = e.target[9].value;
          if (e.target[10].checked) morals = e.target[10].value;
          if (e.target[11].checked) morals = e.target[11].value;

          setName(e.target[1].value);
          setUsername(e.target[0].value)
          setCharacterDescription({
            personality: e.target[2].value,
            bonds: e.target[3].value,
            ideals: e.target[4].value,
            flaws: e.target[5].value,
            Alignment: `${lawful} ${morals}`,
          });
          setView(2);
        }}
      >
        <div>
          <label htmlFor="username">What is your username?</label>
          <input
            type="text"
            id="username"
            required
            minLength="3"
            maxLength="20"
            defaultValue={userId}
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="character">What's your characters name?</label>
          <input
            type="text"
            id="character"
            required
            minLength="3"
            maxLength="20"
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="personality">
            Describe or list some personality traits of your character.
          </label>
          <input
            type="text"
            id="personality"
            maxLength="200"
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="bonds">
            Who or what is most important to your character? i.e. person, a
            group, an event, or a place
          </label>
          <input
            type="text"
            id="bonds"
            maxLength="100"
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="ideals">
            What are some ideals, principles, or ambitions, that motivate your
            character?
          </label>
          <input
            type="text"
            id="ideals"
            maxLength="100"
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          <label htmlFor="flaws">
            What are some flaws, vices, fears, or weaknesses, that define your
            character?
          </label>
          <input
            type="text"
            id="flaws"
            maxLength="100"
            autoComplete="off"
          ></input>
        </div>
        <br />
        <div>
          Does your character value the laws of society, or do they prefer
          Anarchy?
          <br />
          <label htmlFor="lawful">Lawful</label>
          <input type="radio" id="lawful" name="lawful" value="Lawful" className="regular-radio"></input>
          <br />
          <label htmlFor="neutral">Neutral</label>
          <input
            type="radio"
            id="neutral"
            name="lawful"
            className="regular-radio"
            value="Neutral"
          ></input>
          <br />
          <label htmlFor="chaotic">Chaotic</label>
          <input
            type="radio"
            id="chaotic"
            name="lawful"
            className="regular-radio"
            value="Chaotic"
          ></input>
        </div>
        <br />
        <div>
          Is your character good, evil, or somewhere in-between?
          <br />
          <label htmlFor="good">Good</label>
          <input type="radio" id="good" name="morals" value="Good" className="regular-radio"></input>
          <br />
          <label htmlFor="neutral">Neutral</label>
          <input
            type="radio"
            id="neutral"
            name="morals"
            className="regular-radio"
            value="Neutral"
          ></input>
          <br />
          <label htmlFor="evil">Evil</label>
          <input type="radio" className="regular-radio" id="evil" name="morals" value="Evil"></input>
          <br />
        </div>
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Backstory;
