import React from "react";
import { useEffect } from "react";
import JumpBack from "./jumpBackToList";

const Congrats = ({ props }) => {
  const {
    setUserId,
    userId,
    setView,
    name,
    characterDescription,
    info,
    mainStats,
    equipment,
    speed,
    armorClass,
    languageAndProficiencies,
    featuresAndTraits,
    attacksAndSpells,
  } = props;

  useEffect(() => {
    if (userId !== "") {
      setView(5);
    }
  }, []);

  return (
    <div id="congrats">
      <JumpBack setView={setView} />
      <div>
        Congrats on completing character creation!
        <br />
        This is only the start of your adventure!
        <br />
        <br />
        I noticed you're not signed in!
        <br />
        This site can store your Sheet for you to come back later!
        <br />
        <br />
        Just type things in the boxes right here :)
        <br />
        <br />
      </div>
      <div className="basicSection">
        <strong>Sign Up</strong>
        <br />
        <br />
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              minLength="3"
              maxLength="20"
              autoComplete="off"
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              minLength="3"
              maxLength="20"
              autoComplete="off"
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="passwordconfirm">Confirm Password:</label>
            <input
              type="password"
              id="passwordconfirm"
              required
              minLength="3"
              maxLength="20"
            ></input>
            <br />
            <br />
          </div>
          Once you're done, hit this button!
          <br />
          <button
            className="submitButton"
            onClick={(e) => {
              e.preventDefault();
              if (e.target.form[1].value === e.target.form[2].value) {
                fetch("http://localhost:8080/user", {
                  method: "POST",
                  credentials: "include",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    username: e.target.form[0].value,
                    password: e.target.form[1].value,
                    name,
                    characterDescription,
                    info,
                    mainStats,
                    languageAndProficiencies,
                    armorClass,
                    speed,
                    attacksAndSpells,
                    featuresAndTraits,
                    equipment,
                  }),
                })
                  .then((data) => data.json())
                  .then((response) => {
                    if (response === "username already taken") {
                      alert("username already taken");
                    } else if (response.hasOwnProperty("newUser")) {
                      setUserId(response.newUser.username);
                      setView(5);
                    }
                  });
              } else {
                alert("Passwords do not match");
              }
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
      <br />
      <div className="basicSection">
        <strong>I already have an account</strong>
        <br />
        <br />
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              required
              minLength="3"
              maxLength="20"
              autoComplete="off"
            ></input>
            <br />
            <br />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              required
              minLength="3"
              maxLength="20"
              autoComplete="off"
            ></input>
            <br />
            <br />
          </div>

          <br />
          <button
            className="submitButton"
            onClick={(e) => {
              e.preventDefault();
              fetch("http://localhost:8080/loginandsave", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: e.target.form[0].value,
                  password: e.target.form[1].value,
                  name,
                  characterDescription,
                  info,
                  mainStats,
                  languageAndProficiencies,
                  armorClass,
                  speed,
                  attacksAndSpells,
                  featuresAndTraits,
                  equipment,
                }),
              })
                .then((data) => data.json())
                .then((response) => {
                  if (response === "username already taken") {
                    alert("username already taken");
                  } else if (response.hasOwnProperty("newUser")) {
                    setUserId(response.newUser.username);
                    setView(5);
                  }
                });
            }}
          >
            Log In and Store
          </button>
        </form>
      </div>
    </div>
  );
};

export default Congrats;
