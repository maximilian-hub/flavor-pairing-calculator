import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.js";
import InputField from "./components/InputField.js";
import BodyPanel from "./components/BodyPanel.js";
import Subpanel from "./components/Subpanel.js";

//returns an array of all ingredient names
async function getAllIngredientNames() {
  let allIngredientNames = [];

  //send server request
  let response = await fetch("/api", {
    method: "GET",
  });

  //parse server response
  const serverData = await response.json();
  const tableObjects = serverData.body;
  for (let i = 0; i < tableObjects.length; i++) {
    allIngredientNames.push(tableObjects[i].name);
  }

  return allIngredientNames;
}

let ALL_INGREDIENT_NAMES = [];
getAllIngredientNames().then((response) => {
  ALL_INGREDIENT_NAMES = response;
});

function App() {
  //state
  const [requestedIngredients, setRequestedIngredients] = useState([
    "apple",
    "chicken",
  ]);

  const [resultIngredients, setResultIngredients] = useState([]);
  const [mismatchedIngredients, setMismatchedIngredients] = useState([]);

  //send POST request whenever requestedIngredients is updated:
  useEffect(() => {
    async function fetchData() {
      //ask the server for a list of common pairings of requestedIngredients:
      console.log("fetching data...");
      const response = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients: requestedIngredients }),
      });

      const data = await response.json();
      console.log(data);
      setResultIngredients(data.body);
      setMismatchedIngredients(data.mismatchedIngredients);
    }

    //only send request if there are requested ingredients:
    if (requestedIngredients.length >= 1) {
      fetchData();
    } else {
      setResultIngredients([]);
    }
  }, [requestedIngredients]);

  function addRequestedIngredient(ingredient) {
    if (
      ALL_INGREDIENT_NAMES.includes(ingredient) && //if the ingredient is valid
      !requestedIngredients.includes(ingredient) //if it's not a repeat
    ) {
      setRequestedIngredients([...requestedIngredients, ingredient]);
    } else {
      alert(
        `"${ingredient}" is not the name of an ingredient in our database.`
      );
    }
  }

  function removeRequestedIngredient(name) {
    const updatedList = requestedIngredients.filter(
      (ingredient) => ingredient !== name
    );

    setRequestedIngredients(updatedList);
  }

  function getWarnings(ingredient) {
    // global variable mismatchedIngredients
    // is an array of ingredient pairs, eg:
    //   [["bacon","almond"],["almond","lime"]]

    // This function provides request Ingredient
    // components with an array of ingredient names
    // for which they are mismatched.

    // For the example data above, given "almond"
    // as a parameter, this function should return:
    //   ["bacon","lime"]

    let warnings = new Array();

    for (let i = 0; i < mismatchedIngredients.length; i++) {
      if (mismatchedIngredients[i].includes(ingredient)) {
        warnings.push(theOtherOne(ingredient, mismatchedIngredients[i]));
      }
    }
    console.log(`warnings for ${ingredient}:\n${warnings}`);
    return warnings;
  }

  //component tree:
  return (
    <>
      <Header />
      <InputField addRequestedIngredient={addRequestedIngredient} />
      <BodyPanel>
        <Subpanel
          type="requests"
          removeRequestedIngredient={removeRequestedIngredient}
          ingredientList={requestedIngredients}
          getWarnings={getWarnings}
        ></Subpanel>
        <i id="arrow-icon" className="fa-regular fa-circle-right"></i>
        <Subpanel
          type="results"
          addRequestedIngredient={addRequestedIngredient}
          ingredientList={resultIngredients}
        ></Subpanel>
      </BodyPanel>
    </>
  );
}

export default App;

function theOtherOne(ingredient, mismatchedPair) {
  let theOtherOne = "";

  if (mismatchedPair[0] === ingredient) {
    theOtherOne = mismatchedPair[1];
  } else {
    theOtherOne = mismatchedPair[0];
  }

  return theOtherOne;
}
