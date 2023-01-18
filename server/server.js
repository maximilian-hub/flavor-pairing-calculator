//load packages
const db = require("better-sqlite3")("db.sqlite");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const { transferableAbortController } = require("util");

//server initialization:
const app = express(); //start application
app.listen(5000, () =>
  //start listening for requests
  console.log("Listening at port 5000.")
);

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

  response.json({
    status: "success",
    body: commonPairings,
    mismatchedIngredients: mismatchedIngredients,
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

  for (let i = 0; i < ingredients.length - 1; i++) {
    for (let j = i + 1; j < ingredients.length; j++) {
      if (isLegitPairing(ingredients[i], ingredients[j])) {
        continue;
      } else {
        mismatchedIngredients.push([ingredients[i], ingredients[j]]);
      }
    }
  }
  console.log(`mismatchedIngredients:\n${mismatchedIngredients}`);
  return mismatchedIngredients;
}

/*
  Expects two valid ingredient names.

  Checks if the ingredients are listed as
  pairings of each other.
*/
function isLegitPairing(ingredient_A, ingredient_B) {
  let isLegit = false;

  console.log(
    "isLegitPairing: comparing " + ingredient_A + " to " + ingredient_B
  );

  //assuming pairings are always listed in each other's tables (TODO: make this so!)
  //query database for ingredient_A's pairings:
  const sql = "SELECT pairing FROM " + ingredient_A + ";";
  const stmnt = db.prepare(sql);
  const pairingsOfIngredient_A = stmnt.all();

  //check if those pairings contain ingredient_B
  for (let i = 0; i < pairingsOfIngredient_A.length; i++) {
    if (pairingsOfIngredient_A[i].pairing == ingredient_B) {
      isLegit = true;
      break;
    }
  }

  return isLegit;
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
