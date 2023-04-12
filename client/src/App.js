import React, { useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField.js";
import BodyPanel from "./components/BodyPanel.js";
import Subpanel from "./components/Subpanel.js";
import IntroSplash from "./components/IntroSplash";
import Cookies from "js-cookie";

let ALL_INGREDIENT_NAMES = [];
getAllIngredientNames().then((response) => {
  ALL_INGREDIENT_NAMES = response;
});

function App() {
  //state
  const [requestedIngredients, setRequestedIngredients] = useState(["apple"]);
  const [resultIngredients, setResultIngredients] = useState([]);
  const [mismatchedIngredients, setMismatchedIngredients] = useState([]);
  const [forbiddenIngredients, setForbiddenIngredients] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 600;
  const [displaySplash, setDisplaySplash] = useState(false);

  // to run when component mounts:
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // cookies:
    const visited = Cookies.get("visited");
    if (!visited) {
      setDisplaySplash(true);
      Cookies.set("visited", "true", { expires: 30 }); //cookie expires in 30 days
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //send POST request whenever requestedIngredients is updated:
  useEffect(() => {
    async function fetchData() {
      //ask the server for a list of common pairings of requestedIngredients:
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients: requestedIngredients }),
        }
      );

      const data = await response.json();
      setResultIngredients(data.body);
      setMismatchedIngredients(data.mismatchedIngredients);
      setForbiddenIngredients(data.forbiddenIngredients);
    }

    //only send request if there are requested ingredients:
    if (requestedIngredients.length >= 1) {
      fetchData();
    } else {
      setResultIngredients([]);
    }
  }, [requestedIngredients]);

  function addRequestedIngredient(ingredient) {
    ingredient = ingredient.replaceAll(" ", "_");

    if (!ALL_INGREDIENT_NAMES.includes(ingredient)) {
      //if it's not a valid ingredient
      alert(
        `"${ingredient}" is not the name of an ingredient in our database.`
      );
    } else if (requestedIngredients.includes(ingredient)) {
      //if it's already been requested
      // do nothing
    } else {
      setRequestedIngredients([...requestedIngredients, ingredient]);
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

    let warnings = [];

    for (let i = 0; i < mismatchedIngredients.length; i++) {
      if (mismatchedIngredients[i].includes(ingredient)) {
        warnings.push(theOtherOne(ingredient, mismatchedIngredients[i]));
      }
    }

    return warnings;
  }

  function getStrongWarnings(ingredient) {
    // global variable mismatchedIngredients
    // is an array of ingredient pairs, eg:
    //   [["bacon","almond"],["almond","lime"]]

    // This function provides request Ingredient
    // components with an array of ingredient names
    // for which they are mismatched.

    // For the example data above, given "almond"
    // as a parameter, this function should return:
    //   ["bacon","lime"]

    let strongWarnings = [];

    for (let i = 0; i < forbiddenIngredients.length; i++) {
      if (forbiddenIngredients[i].includes(ingredient)) {
        strongWarnings.push(theOtherOne(ingredient, forbiddenIngredients[i]));
      }
    }

    return strongWarnings;
  }

  function handleRandomButton() {
    const randomIndex = Math.floor(Math.random() * ALL_INGREDIENT_NAMES.length);
    addRequestedIngredient(ALL_INGREDIENT_NAMES[randomIndex]);
  }

  //component tree:
  return (
    <>
      {displaySplash ? <IntroSplash /> : null}
      <InputField
        addRequestedIngredient={addRequestedIngredient}
        handleRandomButton={handleRandomButton}
        getAutocompleteSuggestions={getAutocompleteSuggestions}
      />
      <BodyPanel mobile={width < breakpoint}>
        <Subpanel
          type="requests"
          mobile={width < breakpoint}
          removeRequestedIngredient={removeRequestedIngredient}
          ingredientList={requestedIngredients}
          getWarnings={getWarnings}
          getStrongWarnings={getStrongWarnings}
        ></Subpanel>
        {width < breakpoint ? (
          <></>
        ) : (
          <i id="arrow-icon" className="fa-regular fa-circle-right"></i>
        )}

        <Subpanel
          type="results"
          mobile={width < breakpoint}
          addRequestedIngredient={addRequestedIngredient}
          ingredientList={resultIngredients}
        ></Subpanel>
      </BodyPanel>
    </>
  );
}

export default App;

function theOtherOne(ingredient, mismatchedPair) {
  /*
    Given one ingredient of a mismatched pair,
    and the pair itself, returns the other one.
  */
  let theOtherOne = "";

  if (mismatchedPair[0] === ingredient) {
    theOtherOne = mismatchedPair[1];
  } else {
    theOtherOne = mismatchedPair[0];
  }

  return theOtherOne;
}

async function getAllIngredientNames() {
  //returns an array of all ingredient names
  let allIngredientNames = [];

  //send server request
  let response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api`, {
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

function getAutocompleteSuggestions(searchValue) {
  /*
      For autocomplete.

      Returns an array of ingredientName
      strings matching the searchValue.
      (or a "nothing found" message)

      Matches can be in the middle of the
      string, but matches at the beginning
      of the string are prioritized.
    */
  searchValue = searchValue.replaceAll(" ", "_");
  let priorityResults = [];
  let mainResults = [];

  ALL_INGREDIENT_NAMES.forEach((ingredientName) => {
    if (ingredientName.includes(searchValue)) {
      if (ingredientName.indexOf(searchValue) === 0) {
        priorityResults.push(ingredientName);
      } else {
        mainResults.push(ingredientName);
      }
    }
  });

  let results = priorityResults.concat(mainResults);
  if (results.length === 0) results = ["No flavors found."];

  return results;
}
