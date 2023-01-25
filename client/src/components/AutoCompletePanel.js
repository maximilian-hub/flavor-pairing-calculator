import React from "react";
import AutoCompleteSuggestion from "./AutoCompleteSuggestion.js";

export default function AutoCompletePanel(props) {
  let suggestionElementArray = getSuggestionElements(props.suggestions);

  function getSuggestionElements(suggestions) {
    let suggestionElements = [];

    suggestions.forEach((suggestion, i) => {
      suggestionElements.push(
        <AutoCompleteSuggestion
          key={i}
          searchValue={props.searchValue}
          suggestion={suggestion}
          addRequestedIngredient={props.addRequestedIngredient}
          clearInput={props.clearInput}
          clearAutoComplete={props.clearAutoComplete}
        />
      );
    });

    return suggestionElements;
  }

  return <div className="autocomplete-panel">{suggestionElementArray}</div>;
}
