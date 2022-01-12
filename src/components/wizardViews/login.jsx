import React, { useEffect } from "react";

const LogIn = ({ setView, setUserId }) => {

  useEffect(() => {
    fetch("http://localhost:8080/login", {
      credentials:'include'
    })
    .then(res => res.json())
    .then(res => {
      if ('username' in res){
        setUserId(res.username);
        setView(5);
      }
    })
  }, [])
  
  return (
    <div id="login">
      <div className="loginsection">
        <form style={{ textAlign: "center" }}>
          Hello!
          <br />
          If you have an account please log in!
          <br />
          <label htmlFor="username">Username:</label>
          <br />
          <div>
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
            <br />
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
          <button
            className="submitButton"
            onClick={(e) => {
              e.preventDefault();
              console.log(e.target.form[0].value)
              fetch("http://localhost:8080/login", {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  username: e.target.form[0].value,
                  password: e.target.form[1].value,
                }),
              })
                .then((data) => data.json())
                .then((response) => {
                  if (response.hasOwnProperty("username")) {
                    setUserId(response.username);
                    setView(5);
                  } else {
                    alert("Sorry username or password is incorrect!");
                  }
                });
            }}
          >
            Continue
          </button>
        </form>
      </div>
      <div className="loginsection">
        If you do NOT have an account click Here:
        <button
          className="submitButton"
          onClick={(e) => {
            e.preventDefault();
            setView(1);
          }}
        >
          Start an Adventure
        </button>
      </div>
    </div>
  );
};

export default LogIn;
