import React from "react";

export default function Ingredient(props) {
  //render buttons based on type:
  let iconButton;
  if (props.type === "requests") {
    iconButton = (
      <i
        className="fa-regular fa-trash-can icon-button delete-button"
        onClick={handleRequestButton}
      ></i>
    );
  } else if (props.type === "results") {
    iconButton = (
      <i
        className="fa-solid fa-arrow-rotate-left icon-button add-button"
        onClick={handleAddButton}
      ></i>
    );
  }

  function handleRequestButton() {
    props.removeRequestedIngredient(props.value);
  }

  function handleAddButton() {
    props.addRequestedIngredient(props.value);
  }

  function getClassName() {
    //base className for all Ingredients:
    let className = "ingredient";

    //className for formatting based on affinity:
    if (props.type === "results") {
      if (props.affinity === 1) {
        //normal text
      } else if (props.affinity === 2) {
        //bold text
        className += " bold";
      } else if (props.affinity >= 3) {
        //bold all caps
        className += " bold caps";
      }
    }

    return className;
  }

  function getContainerClassName() {
    let containerClassName = "ingredient-container";

    if (props.type === "requests") {
      if (props.warnings.length > 0) containerClassName += " warning";
      if (props.strongWarnings.length > 0)
        containerClassName += " strongwarning";
    }

    return containerClassName;
  }

  //provides the last bit of formatting for the ingredient names.
  function getValue() {
    let value = props.value;

    value = value.replace("_", " ");

    if (props.affinity === 4) {
      value = "*" + value;
    }

    return value;
  }

  return (
    <div className={getContainerClassName()}>
      <div className={getClassName()}>{getValue()}</div>
      {iconButton}
    </div>
  );
}
