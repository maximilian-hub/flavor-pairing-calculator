/*
  Run with Node.

  This is my workspace for cleaning up
  & adjusting the database.
*/
const db = require("better-sqlite3")("db.sqlite");
const fs = require("fs");
let tableNames = getTableNames();
const CLEANING_LOG_PATH = "./logs/cleaning_log.txt";

cleanDatabase();

function cleanDatabase() {
  removeRedundantRowsFromDatabase();
  //removeInvalidCharactersFromPairings();
  //expandTwoWayPairings();
}

function expandTwoWayPairings() {
  /*
    The original dataset contains a lot of 
    pairings that are not listed in both entries.
    I call these "one-way" pairings.

    For example, cayenne's entry lists caviar as a
    -1 pairing, but caviar's entry doesn't mention
    cayenne.

    In some cases, entries list ingredients that
    do not have an entry themselves. Notable
    examples include cream, sugar, and salt.

    I believe this is an oversight, as it would
    have been incredibly difficult to catch all 
    of these without organized data.

    This function expands one-way pairings,
    creating new tables when necessary, 
    resulting in a database in which pairings
    are truly pairings.
  */
  //for each existing table,
  initialTableNames = getTableNames();
  initialTableNames.forEach((currentTableName) => {
    //for each entry in that table,
    let currentEntries = getEntries(currentTableName);
    currentEntries.forEach((currentEntry) => {
      //check if that entry has its own table.
      if (tableNames.includes(currentEntry.pairing)) {
        //if so, check if currentTableName is an entry in that table.
        if (!isAnEntryOf(currentTableName, currentEntry.pairing)) {
          //if not, add currentTableName as an entry in that table, with currentEntry's affinity
          addEntryToTable(
            { pairing: currentTableName, affinity: currentEntry.affinity },
            currentEntry.pairing
          );
        } else {
          console.log(
            `${currentTableName} is already listed under ${currentEntry.pairing}.`
          );
        }
      } else {
        //if not, create a table named currentEntry,
        //and add currentTableName as an entry in that table.
        addTableToDatabase(currentEntry.pairing, [
          { pairing: currentTableName, affinity: currentEntry.affinity },
        ]);
      }
    });
  });
}

function isAnEntryOf(pairing, tableName) {
  let isAnEntryOf = false;

  let tableEntries = getEntries(tableName);
  for (tableEntry of tableEntries) {
    if (tableEntry.pairing === pairing) {
      isAnEntryOf = true;
      break;
    }
  }

  return isAnEntryOf;
}

function addEntryToTable(entry, tableName) {
  let sql = `INSERT INTO ${tableName} VALUES('${entry.pairing}', ${entry.affinity});`;
  logAndSaveText(sql);
  db.prepare(sql).run();
}

function addTableToDatabase(tableName, entriesArray) {
  let sql =
    "CREATE TABLE " + tableName + " (pairing VARCHAR(30), affinity INTEGER);";
  db.prepare(sql).run();
  logAndSaveText(sql);
  //update tableNames
  tableNames = getTableNames();

  if (entriesArray.length > 0) {
    entriesArray.forEach((newEntry) => {
      addEntryToTable(newEntry, tableName);
    });
  }
}

function removeInvalidCharactersFromPairings() {
  /*
    Due to an error on my part importing the data,
    pairings with more than two words have spaces
    instead of underscores afer the first underscore.

    e.g., "sweetened_condensed milk"

    This function replaces those spaces with underscores.
  */
  tableNames.forEach((tableName) => {
    //fix spaces
    let sql = `UPDATE ${tableName} SET pairing = REPLACE(pairing, ' ', '_');`;
    db.prepare(sql).run();

    //fix hyphens
    sql = `UPDATE ${tableName} SET pairing = REPLACE(pairing, '-', '_');`;
    db.prepare(sql).run();

    //fix apostrophes
    sql = `UPDATE ${tableName} SET pairing = REPLACE(pairing, '''', '_');`;
    db.prepare(sql).run();
  });
}

function removeRedundantRowsFromDatabase() {
  //removes entries that match their table name.
  tableNames.forEach((tableName) => {
    const sql =
      "DELETE FROM " + tableName + " WHERE pairing = '" + tableName + "'";
    db.prepare(sql).run();
  });
}

function getEntries(tableName) {
  //returns an array of pairing objects: {pairing: string, affinity: int}
  const sql = "SELECT * FROM " + tableName + ";";
  const stmnt = db.prepare(sql);
  const pairings = stmnt.all();

  return pairings;
}

function getTableNames() {
  const sql =
    "SELECT name\n" +
    "FROM sqlite_schema\n" +
    "WHERE\n" +
    "  type = 'table' AND\n" +
    "  name NOT LIKE 'sqlite_%';"; //gotta leave out the schema tables that deal with metadata

  const stmnt = db.prepare(sql);
  const tableNameObjects = stmnt.all();

  let tableNames = [];

  for (tableNameObject of tableNameObjects) {
    tableNames.push(tableNameObject.name);
  }
  return tableNames;
}

function logAndSaveText(text) {
  console.log(text);
  fs.appendFileSync(CLEANING_LOG_PATH, text + "\n");
}
