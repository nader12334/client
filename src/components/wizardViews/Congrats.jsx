import React from "react";
import { useEffect } from "react";
import axios from "axios";

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
    if (userId) {
      setView(5);
    }
  }, []);

  return (
    <div id="congrats">

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
                axios
                  .post("http://localhost:8080/graphql", {
                    query: `mutation($characterSheet: SheetInput, $user: UserInput) {
                            createUser(characterSheet: $characterSheet, user: $user) {
                              username
                            }
                          }`,
                    variables: {
                      user: {
                        username: e.target.form[0].value,
                        password: e.target.form[1].value,
                      },
                      characterSheet: {
                        name,
                        username: e.target.form[0].value,
                        characterDescription,
                        info,
                        mainStats,
                        languageAndProficiencies,
                        armorClass,
                        speed,
                        attacksAndSpells,
                        featuresAndTraits,
                        equipment,
                      },
                    },
                  })
                  .then(({ data }) => {
                    const { createUser } = data.data;
                    if (createUser) {
                      setUserId(createUser.username);
                      setView(5);
                    } else {
                      alert("username already taken");
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
              axios.post("http://localhost:8080/graphql", {
                query: `
                  query($username: String, $password: String) {
                    login(username: $username, password: $password) {
                      username
                    }
                  }`,
                variables: {
                  username: e.target.form[0].value,
                  password: e.target.form[1].value,
                },
              })
                .then(({data}) => {
                  const { login } = data.data;
                  if (login) {
                    setUserId(login.username);
                    setView(5);
                  } else {
                    alert("User does not exist");
                  }
                });
            }}
          >
            Log In then Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Congrats;
