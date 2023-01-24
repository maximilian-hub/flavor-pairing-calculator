import React from "react";

export default function InputField(props) {
  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      props.addRequestedIngredient(e.target.value);
      e.target.value = "";
    }
  }

  return (
    <div id="inputfield-container">
      <input
        id="inputfield"
        type="text"
        placeholder="Type a flavor & hit 'Enter!'"
        onKeyDown={handleKeyDown}
        autoComplete="off"
      ></input>
      <i
        className="fa-solid fa-dice icon-button random-button"
        onClick={props.handleRandomButton}
        title="add random flavor"
      ></i>
    </div>
  );
}
