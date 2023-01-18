/*
  Run with Node.

  This is my workspace for cleaning up
  & adjusting the database.
*/
const db = require("better-sqlite3")("db.sqlite");
const tableNames = getTableNames();

cleanDatabase();

function cleanDatabase() {
  //removeRedundantRowsFromDatabase();
}

//remove entries that match the table name.
function removeRedundantRowsFromDatabase() {
  tableNames.forEach((entry) => {
    let tableName = entry.name;
    const sql =
      "DELETE FROM " + tableName + " WHERE pairing = '" + tableName + "'";
    db.prepare(sql).run();
  });
}

function getPairings(tableName) {
  const sql = "SELECT * FROM " + ingredient + ";";
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
  const tableNames = stmnt.all();
  return tableNames;
}
