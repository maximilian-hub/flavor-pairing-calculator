import React, { useState, useEffect } from "react";

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

  function handleOnClick(e) {
    props.addRequestedIngredient(props.suggestion);
    props.clearInput();
  }

  return (
    <div className="autocomplete-suggestion" onClick={handleOnClick}>
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
