//load packages
const db = require('better-sqlite3')('db.sqlite');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

//server initialization:
const app = express();              //start application
app.listen(3000,                    //start listening for requests
  ()=> console.log("Listening at port 3000.")
);
app.use(express.static('public'));  //serve webpage from public directory
app.post('/api', bodyParser.json(), handlePostRequest); //route POST requests

//mock data:
//db.run('CREATE TABLE parsley(pairing VARCHAR(30), affinity int);');
//db.run('CREATE TABLE garlic(pairing VARCHAR(30), affinity int);');
//db.run("INSERT INTO parsley VALUES('tomato',1), ('marjoram',1);");
//db.run("INSERT INTO garlic VALUES('tomato',1), ('bacon',1);");

async function handlePostRequest (request,response) {
  console.log("POST request recieved:");
  console.log(request.body);              //should be a list of ingredient names

  let commonPairings = await getCommonPairings(request.body.ingredients);

  response.body = {
    status: "success",
    body: commonPairings
  }
}

/*
  Expects an array of valid ingredient names.
  Returns an array of pairings common to those ingredients.
*/
async function getCommonPairings(requestedIngredients) {
  //grab all pairings of the user-requested ingredients:
  let allPairings = await getAllPairings(requestedIngredients);

  //look for matches
  //let commonPairings = findMatches(allPairings);

  //return matches
  //return commonPairings;
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
  Expects an array in which each element contains
  the pairings of an ingredient.

  Returns an array of the pairings shared by all ingredients.
*/
function findMatches() {

}

