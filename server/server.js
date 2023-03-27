//load packages
const db = require("better-sqlite3")("db.sqlite");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

//server initialization:
const app = express(); //start application
const port = process.env.PORT || 5000;
app.listen(port, () =>
  //start listening for requests
  console.log("Listening at " + port + ".")
);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.post("/api", bodyParser.json(), handlePostRequest); //route POST requests
app.get("/api", handleGetRequest);

/*
  POST requests send the server an array of 
  validated ingredient names.

  In response, they expect an array of objects
  representing the pairings common to the
  given ingredients:
    [
      {pairing: "apple", affinity:3},
      {pairing: "bacon", affinity:1},
      ...
    ]
*/
async function handlePostRequest(request, response) {
  console.log("POST request recieved:");
  console.log(request.body); //should be a list of ingredient names

  const commonPairings = await getCommonPairings(request.body.ingredients);
  const mismatchedIngredients = getMismatchedIngredients(
    request.body.ingredients
  );
  const forbiddenIngredients = getForbiddenIngredients(
    request.body.ingredients
  );

  console.log("Sending off common pairings.");
  console.log(`mismatchedIngredients:\n${mismatchedIngredients}`);
  console.log(`forbiddenIngredients:\n${forbiddenIngredients}`);

  response.json({
    status: "success",
    body: commonPairings,
    mismatchedIngredients: mismatchedIngredients,
    forbiddenIngredients: forbiddenIngredients,
  });
}

async function handleGetRequest(request, response) {
  //client GET requests are always for a list of all db table names
  console.log("GET request recieved:");

  const tableNames = await getTableNames();

  response.json({
    status: "success",
    body: tableNames,
  });
}

/*
  Expects an array of valid ingredient names.
  Returns an array of pairings common to those ingredients.
*/
async function getCommonPairings(requestedIngredients) {
  let commonPairings = [];

  //grab all pairings of the user-requested ingredients:
  let allPairings = await getAllPairings(requestedIngredients);

  //look for matches
  console.log("Looking for common pairings...");
  //for each pairing in the first set of pairings,
  for (let i = 0; i < allPairings[0].length; i++) {
    //check if that pairing exists in the remaining sets of pairings
    const currentPairing = allPairings[0][i];

    if (isCommon(currentPairing, allPairings)) {
      currentPairing.affinity = getAverageAffinity(currentPairing, allPairings);
      commonPairings.push(currentPairing);
    }
  }

  commonPairings.sort((a, b) => (a.pairing > b.pairing ? 1 : -1));

  return commonPairings;
}

function getAverageAffinity(currentPairing, allPairings) {
  let affinities = [];
  affinities.push(currentPairing.affinity);

  //for each set of pairings other than the first,
  for (let i = 1; i < allPairings.length; i++) {
    for (let j = 0; j < allPairings[i].length; j++) {
      if (currentPairing.pairing === allPairings[i][j].pairing) {
        affinities.push(allPairings[i][j].affinity);
      }
    }
  }

  const affinityAverage = average(affinities);

  return Math.round(affinityAverage);
}

function average(arrayOfNumbers) {
  let sum = 0;
  for (let i = 0; i < arrayOfNumbers.length; i++) {
    sum += arrayOfNumbers[i];
  }

  const average = sum / arrayOfNumbers.length;

  return average;
}

/*
  Expects an array of valid ingredient names.

  Returns an array in which each element contains
  the pairings of an ingredient.
*/
function getAllPairings(requestedIngredients) {
  let allPairings = [];

  //query database
  for (let i = 0; i < requestedIngredients.length; i++) {
    const sql = "SELECT * FROM " + requestedIngredients[i] + ";";
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    allPairings.push(rows);
  }

  return allPairings;
}

/*
  Returns true if currentPairing is a pairing
  of every other set of pairings in allPairings.
*/
function isCommon(currentPairing, allPairings) {
  //for each set of pairings other than the first,
  for (let i = 1; i < allPairings.length; i++) {
    //check to see if it contains the currentPairing
    let isCommon = false;
    for (let j = 0; j < allPairings[i].length; j++) {
      if (allPairings[i][j].pairing == currentPairing.pairing) {
        isCommon = true;
        break;
      }
    }
    //if it doesn't, return false
    if (!isCommon) {
      return false;
    }
    //if it does, move on to the next set of pairings
  }
  //if they all do, return true
  return true;
}

/*
  Expects an array of valid ingredient names.

  Returns an array of those ingredients not
  listed as pairings of each other.
*/
function getMismatchedIngredients(ingredients) {
  let mismatchedIngredients = [];

  //for each combination of ingredients,
  for (let i = 0; i < ingredients.length - 1; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      if (isLegitPairing(ingredients[i], ingredients[j])) {
        continue;
      } else {
        mismatchedIngredients.push([ingredients[i], ingredients[j]]);
      }
    }
  }
  console.log(`  mismatchedIngredients:\n${mismatchedIngredients}`);
  return mismatchedIngredients;
}

function getForbiddenIngredients(ingredients) {
  /*
  Expects an array of valid ingredient names.

  Returns an array of those ingredients for whom
  at least one lists the other as a pairing to avoid.
  */

  let forbiddenIngredients = [];

  for (let i = 0; i < ingredients.length - 1; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      if (isForbiddenPairing(ingredients[i], ingredients[j])) {
        console.log(
          `getForbiddenIngredients: Pushing [${ingredients[i]},${ingredients[j]}] to forbiddenIngredients.`
        );
        forbiddenIngredients.push([ingredients[i], ingredients[j]]);
      } else {
        continue;
      }
    }
  }

  console.log(`  forbiddenIngredients:\n${forbiddenIngredients}`);
  return forbiddenIngredients;
}

/*
  Expects two valid ingredient names.

  Checks if the ingredients are listed as
  good pairings of each other.
*/
function isLegitPairing(ingredient_A, ingredient_B) {
  let isLegit = false;

  //assuming pairings are always listed in each other's tables (TODO: make this so!)
  const pairingsOfIngredient_A = getPairings(ingredient_A);

  //check if those pairings contain ingredient_B
  for (let i = 0; i < pairingsOfIngredient_A.length; i++) {
    if (
      pairingsOfIngredient_A[i].pairing === ingredient_B &&
      pairingsOfIngredient_A.affinity !== 0
    ) {
      isLegit = true;
      break;
    }
  }

  return isLegit;
}

function getPairings(ingredient) {
  /*
    Given a valid ingredient name,
    returns an array of objects
    containing all that
    ingredient's pairings.
  */
  const sql = "SELECT * FROM " + ingredient + ";";
  const stmnt = db.prepare(sql);
  const pairings = stmnt.all();

  return pairings;
}

function isForbiddenPairing(ingredient_A, ingredient_B) {
  /*
    Returns true if either ingredient lists the other 
    as a bad pairing.

    TODO: this will no longer be necessary one the 
    database has been expanded to convert one-way
    pairings into two-way pairings.
  */
  if (A_forbids_B(ingredient_A, ingredient_B)) return true;
  if (A_forbids_B(ingredient_B, ingredient_A)) return true;
  return false;
}

function A_forbids_B(ingredient_A, ingredient_B) {
  const pairingsOfIngredient_A = getPairings(ingredient_A);

  for (let i = 0; i < pairingsOfIngredient_A.length; i++) {
    let currentPairing = pairingsOfIngredient_A[i];
    if (
      currentPairing.pairing === ingredient_B &&
      currentPairing.affinity === 0
    ) {
      return true;
    }
  }

  return false;
}

function getTableNames() {
  const sql =
    "SELECT name\n" +
    "FROM sqlite_schema\n" +
    "WHERE\n" +
    "  type = 'table' AND\n" +
    "  name NOT LIKE 'sqlite_%';"; //gotta leave out the schema tables that deal with metadata

  const stmnt = db.prepare(sql);
  const tableNames = stmnt.all();
  return tableNames;
}
