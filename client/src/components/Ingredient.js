import React from "react";

export default function Ingredient(props) {
  //render buttons based on type:
  let iconButton;
  if (props.type === "requests") {
    iconButton = (
      <i
        className="fa-regular fa-trash-can icon-button delete-button"
        onClick={handleDeleteButton}
        title="remove flavor"
      ></i>
    );
  } else if (props.type === "results") {
    iconButton = (
      <i
        className="fa-solid fa-arrow-rotate-left icon-button add-button"
        onClick={handleAddButton}
        title="add flavor to search"
      ></i>
    );
  }

  //render tooltips if requested ingredient has warnings:
  let tooltip;
  if (props.type === "requests") {
    if (hasAnyWarnings()) {
      tooltip = <span className="tooltip">{getWarningText()}</span>;
    }
  }

  function getWarningText() {
    let warningText = "";

    if (props.warnings.length > 0) {
      props.warnings.forEach((warning) => {
        warningText += `-Might not pair well with ${warning}.\n`;
      });
    }

    if (props.strongWarnings.length > 0) {
      props.strongWarnings.forEach((strongWarning) => {
        warningText += `-Strongly recommended not to pair with ${strongWarning}.\n`;
      });
    }

    return warningText;
  }

  function handleDeleteButton() {
    props.removeRequestedIngredient(props.value);
  }

  function handleAddButton() {
    props.addRequestedIngredient(props.value);
  }

  function hasAnyWarnings() {
    return props.warnings.length > 0 || props.strongWarnings.length > 0;
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
    } else if (props.type === "requests") {
      //className for tootips
      if (hasAnyWarnings()) {
        className += " hastooltip";
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

    value = value.replaceAll("_", " ");

    if (props.affinity === 4) {
      value = "*" + value;
    }

    return value;
  }

  return (
    <div className={getContainerClassName()}>
      <div className={getClassName()}>
        {getValue()}
        {tooltip}
      </div>
      {iconButton}
    </div>
  );
}
