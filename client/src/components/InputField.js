import React, { useState } from "react";
import AutoCompletePanel from "./AutoCompletePanel.js";

export default function InputField(props) {
  const [autoComplete, setAutoComplete] = useState([]);

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      props.addRequestedIngredient(e.target.value);
      e.target.value = "";
    }
  }

  function runAutoComplete(e) {
    if (e.target.value === "") {
      // if input field is empty, remove the autocomplete panel
      setAutoComplete([]);
    } else {
      let suggestions = props.getAutocompleteSuggestions(e.target.value);
      setAutoComplete(
        <AutoCompletePanel
          suggestions={suggestions}
          addRequestedIngredient={props.addRequestedIngredient}
          searchValue={e.target.value}
          clearInput={() => {
            e.target.value = "";
            setAutoComplete([]);
          }}
        />
      );
    }
  }

  return (
    <div id="inputfield-container">
      <input
        id="inputfield"
        type="text"
        placeholder="Type a flavor & hit 'Enter!'"
        onKeyDown={handleKeyDown}
        onChange={runAutoComplete}
        autoComplete="off"
      ></input>
      <i
        className="fa-solid fa-dice icon-button random-button"
        onClick={props.handleRandomButton}
        title="add random flavor"
      ></i>
      {autoComplete}
    </div>
  );
}
