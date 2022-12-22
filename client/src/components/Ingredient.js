import React from "react";

export default function Ingredient(props) {
  let iconButton;
  if (props.type === "requests") {
    iconButton = (
      <i
        className="fa-regular fa-trash-can icon-button delete-button"
        onClick={handleDeleteButton}
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

  function handleDeleteButton(e) {
    props.removeRequestedIngredient(props.value);
  }

  function handleAddButton(e) {
    props.addRequestedIngredient(props.value);
  }

  function getClassName() {
    let className = "ingredient";

    if (props.affinity === 1) {
      //normal text
    } else if (props.affinity === 2) {
      //bold text
      className += " bold";
    } else if (props.affinity >= 3) {
      //bold all caps
      className += " bold caps";
    }

    return className;
  }

  function getValue() {
    let value = props.value;

    value = value.replace("_", " ");

    if (props.affinity === 4) {
      value = "*" + value;
    }

    return value;
  }

  return (
    <div className="ingredient-container">
      <div className={getClassName()}>{getValue()}</div>
      {iconButton}
    </div>
  );
}
