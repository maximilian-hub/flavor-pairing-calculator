//connect to database
const db = require("better-sqlite3")("../db.sqlite");
const fs = require("fs").promises;

async function csvToDatabase() {
  const fileNames = await fs.readdir('./processed');

  for (fileName of fileNames) {
    //ignore .DS_Store
    if (fileName.charAt(0) == ".") continue;

    const tableName = fileName.substring(0,fileName.length-4);  //remove '.csv'
    createTable(tableName);

    const csvData = await fs.readFile("./processed/" + fileName);
    const csvText = await csvData.toString();
    const csvLines = csvText.split("\n");

    insertValuesIntoTable(csvLines, tableName);
  }
}//end function

function createTable(tableName) {
  if (tableName.charAt(0) == ".") return;

  let sql = "CREATE TABLE " + tableName + "(pairing VARCHAR(30), affinity INTEGER);";
  console.log(sql);
  let stmnt = db.prepare(sql);
  stmnt.run();
  console.log("Created table: '" + tableName + "'");
}

function insertValuesIntoTable(csvLines, tableName) {
  //for each line of the .csv after the first, 
  for (csvLine of csvLines) {
    if (csvLine == "pairing,affinity") continue;  //skip the first line

    const csvLineValues = csvLine.split(',');
    const pairing = csvLineValues[0];
    const affinity = csvLineValues[1];
    
    const sql = "INSERT INTO " + tableName + " VALUES(?,?);";
    console.log(sql);
    console.log(pairing);
    console.log(affinity);
    const stmnt = db.prepare(sql);
    stmnt.run(pairing,affinity);
  }
}

csvToDatabase();
