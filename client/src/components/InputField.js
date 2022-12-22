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
        placeholder="Type an ingredient here & hit 'Enter!'"
        onKeyDown={handleKeyDown}
      ></input>
    </div>
  );
}
