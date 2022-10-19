//load packages
const db = require('better-sqlite3')('db.sqlite');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

//server initialization:
const app = express();              //start application
app.listen(3000, ()=>               //start listening for requests
  console.log("Listening at port 3000.")
);
app.use(express.static('public'));  //serve webpage from public directory
app.post('/api', bodyParser.json(), handlePostRequest); //route POST requests
app.get('/api', handleGetRequest);

//mock data:
//db.run('CREATE TABLE parsley(pairing VARCHAR(30), affinity int);');
//db.run('CREATE TABLE garlic(pairing VARCHAR(30), affinity int);');
//db.run("INSERT INTO parsley VALUES('tomato',1), ('marjoram',1);");
//db.run("INSERT INTO garlic VALUES('tomato',1), ('bacon',1);");

async function handlePostRequest (request,response) {
  console.log("POST request recieved:");
  console.log(request.body);              //should be a list of ingredient names

  let commonPairings = await getCommonPairings(request.body.ingredients);

  response.json({
    status: "success",
    body: commonPairings
  });
}

async function handleGetRequest (request, response) {
  //client GET requests are always for a list of all db table names
  console.log("GET request recieved:");

  const tableNames = await getTableNames();

  response.json({
    status: "success",
    body: tableNames
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
  for (let i=0; i<allPairings[0].length; i++) {
    //check if that pairing exists in the remaining sets of pairings
    const currentPairing = allPairings[0][i];

    if (isCommon(currentPairing, allPairings)) {
      commonPairings.push(allPairings[0][i]);
    }
  }

  console.log("Common pairings: ");
  console.log(commonPairings);
  return commonPairings;
}

/*
  Expects an array of valid ingredient names.
  Returns an array in which each element contains
  the pairings of an ingredient.
*/
function getAllPairings(requestedIngredients) {
  let allPairings = [];

  //query database
  for (let i=0; i<requestedIngredients.length; i++) {
    const sql = 'SELECT * FROM ' + requestedIngredients[i] + ";";
    const stmnt = db.prepare(sql);
    const rows = stmnt.all();
    allPairings.push(rows);
  }

  console.log("Query finished. allPairings: ");
  console.log(allPairings);
  return allPairings;
}

/*
  Returns true if currentPairing is a pairing
  of every other set of pairings in allPairings.
*/
function isCommon(currentPairing, allPairings) {
  console.log("   Checking pairing:" + currentPairing.pairing);
  //for each set of pairings other than the first,
  for (let i=1; i<allPairings.length; i++) {
    //check to see if it contains the currentPairing
    let isCommon = false;
    for (let j=0; j<allPairings[i].length; j++) {
      if (allPairings[i][j].pairing == currentPairing.pairing) {
        console.log("      ...found!");
        isCommon = true;
        break;
      }
      console.log("      nope...");
    }
    //if it doesn't, return false
    if (!isCommon) return false;
    //if it does, move on to the next set of pairings
  }
  //if they all do, return true
  return true;
}

function getTableNames(){
  const sql = "SELECT name\n" +
              "FROM sqlite_schema\n" +
              "WHERE\n" +
              "  type = 'table' AND\n" +
              "  name NOT LIKE 'sqlite_%';";
  
  const stmnt = db.prepare(sql);
  const tableNames = stmnt.all();

  console.log("  Returning:");
  console.log(tableNames);

  return tableNames;
}