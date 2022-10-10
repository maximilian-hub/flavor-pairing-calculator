//load packages
const sqlite3 = require('sqlite3');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const textParser = bodyParser.text();

//server initialization:
const app = express();              //start application
app.listen(3000,                    //start listening for requests
  ()=> console.log("Listening at port 3000.")
);
app.use(express.static('public'));  //serve webpage from public directory

app.post('/api', textParser, handlePostRequest);

function handlePostRequest (request,response) {
  console.log("POST request recieved.");
  console.log(request.body);

  //request body should be a list of ingredient names
  //query database based on the request body
  //tack query results on to the response
}

//connect to database:
const db = new sqlite3.Database(
  'db.sqlite',
  sqlite3.OPEN_READWRITE,
  (err)=>{
      if (err) console.error(err.message);
      else console.log("Database connected. (db.sqlite)");
  }
);

//mock data:
//db.run('CREATE TABLE parsley(pairing VARCHAR(30), affinity int);');
//db.run('CREATE TABLE garlic(pairing VARCHAR(30), affinity int);');
//db.run("INSERT INTO parsley VALUES('tomato',1), ('marjoram',1);");
//db.run("INSERT INTO garlic VALUES('tomato',1), ('bacon',1);");
