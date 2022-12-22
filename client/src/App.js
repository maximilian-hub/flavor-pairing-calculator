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
    "bacon",
  ]);

  const [resultIngredients, setResultIngredients] = useState([]);

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
    }

    //only send request if there are requested ingredients:
    if (requestedIngredients.length >= 1) {
      fetchData();
    } else {
      setResultIngredients([]);
    }
  }, [requestedIngredients]);

  function addRequestedIngredient(ingredient) {
    if (ALL_INGREDIENT_NAMES.includes(ingredient)) {
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
