import React from "react";
import Ingredient from "./Ingredient";

export default function Subpanel(props) {
  const HEADER_TEXTS = {
    requests: "Requested Ingredients:",
    results: `Shared Pairings (${props.ingredientList.length}):`,
  };

  let INGREDIENT_ARRAY = [];
  if (props.type === "requests") {
    INGREDIENT_ARRAY = props.ingredientList.map((ingredient, index) => {
      return (
        <Ingredient
          value={ingredient}
          key={index}
          type={props.type}
          removeRequestedIngredient={props.removeRequestedIngredient}
          warnings={props.getWarnings(ingredient)}
        />
      );
    });
  } else if (props.type === "results") {
    INGREDIENT_ARRAY = props.ingredientList
      .filter((ingredient) => ingredient.affinity !== 0) // don't show "AVOID" pairings in the results
      .map((ingredient, index) => {
        return (
          <Ingredient
            value={ingredient.pairing}
            affinity={ingredient.affinity}
            key={index}
            type={props.type}
            addRequestedIngredient={props.addRequestedIngredient}
          />
        );
      });
  }

  return (
    <div className="subpanel" id={props.type + "Panel"}>
      <div
        className="subpanel-header subpanel-component"
        id={props.type + "Panel-header"}
      >
        {HEADER_TEXTS[props.type]}
      </div>

      <div
        className="subpanel-body subpanel-component"
        id={props.type + "Panel-body"}
      >
        {INGREDIENT_ARRAY}
      </div>
    </div>
  );
}
