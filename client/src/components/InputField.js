import React, { useState, useRef } from "react";
import AutoCompletePanel from "./AutoCompletePanel.js";

export default function InputField(props) {
  const [autoComplete, setAutoComplete] = useState([]);
  const inputRef = useRef();

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      //enter
      props.addRequestedIngredient(e.target.value);
      e.target.value = "";
      setAutoComplete([]);
    } else if (e.keyCode === 40) {
      //down arrowkey
      e.preventDefault();
      document.querySelector(".autocomplete-suggestion").focus(); //focus first suggestion
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
          inputRef={inputRef}
        />
      );
    }
  }

  return (
    <div id="inputfield-container">
      <div id="inputfield-spacer" />
      <input
        id="inputfield"
        type="text"
        ref={inputRef}
        placeholder="Type a flavor & hit 'Enter!'"
        onKeyDown={handleKeyDown}
        onChange={runAutoComplete}
        autoComplete="off"
      ></input>
      {autoComplete}
      <i
        className="fa-solid fa-dice random-button"
        onClick={props.handleRandomButton}
        title="add random flavor"
      ></i>
    </div>
  );
}
