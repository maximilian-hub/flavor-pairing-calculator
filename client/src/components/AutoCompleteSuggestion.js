import React from "react";

export default function AutoCompleteSuggestion(props) {
  let highlightedSuggestion;
  if (props.suggestion === "No flavors found.") {
    highlightedSuggestion = props.suggestion;
  } else {
    highlightedSuggestion = highlightSearchValue(
      props.suggestion,
      props.searchValue
    );
  }

  function submit() {
    props.addRequestedIngredient(props.suggestion);
    props.clearInput();
    document.getElementById("inputfield").focus(); //TODO: why does this work here, but not from the handleKeyDown()??
  }

  function handleKeyDown(e) {
    if (e.keyCode === 13) {
      //enter
      submit();
    } else if (e.keyCode === 40) {
      //down arrowkey
      e.preventDefault();
      document.activeElement.nextElementSibling.focus();
    } else if (e.keyCode === 38) {
      //up arrowkey

      if (props.suggestionID === 0) {
        //if the top suggestion is currently focused
        document.getElementById("inputfield").focus();
        setTimeout(() => {
          document.getElementById("inputfield").setSelectionRange(100, 100);
        }, 1);
      } else {
        e.preventDefault();
        document.activeElement.previousElementSibling.focus();
      }
    }
  }

  return (
    <div
      className="autocomplete-suggestion"
      onClick={submit}
      onKeyDown={handleKeyDown}
      tabIndex="0"
    >
      {highlightedSuggestion}
    </div>
  );
}

function highlightSearchValue(suggestion, searchValue) {
  /*
    For autocomplete.

    Converts the suggestion string into an 
    inline element where the searchValue
    is highlighted.
  */
  suggestion = suggestion.replaceAll("_", " ");
  const searchValueStartingIndex = suggestion.indexOf(searchValue);
  const searchValueEndingIndex = searchValueStartingIndex + searchValue.length;

  const part1 = suggestion.substring(0, searchValueStartingIndex);
  const part2 = suggestion.substring(
    searchValueStartingIndex,
    searchValueEndingIndex
  );
  const part3 = suggestion.substring(searchValueEndingIndex, suggestion.length);

  return (
    <span>
      {part1}
      <span className="autocomplete-suggestion-searchvalue">{part2}</span>
      {part3}
    </span>
  );
}
