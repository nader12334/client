import React from "react";

const JumpBack = ({setView}) => {
  return (
    <>
      <button className="jumpBack" onClick={(e) => {
        e.preventDefault()
        setView(5)
      }}>Go to Character List</button>
    </>
  )
}

export default JumpBack