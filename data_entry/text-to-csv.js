/*
  This script parses text files from the 
  ./unprocessed directory into .csv files,
  which get written to the ./processed
  directory.

  The text files it expects contain a list
  of ingredients, eg:
    butter
    cumin
    allspice

  These ingredients are divided into sections
  by double newlines:
    [ingredients]

    [ingredients]

    [ingredients]
  
  These indicate the affinity of the pairing.
  +4, +3, +2, +1, +0.


  Sometimes there are no pairings of an affinity.
  These are represented with hyphens.
  Eg, an ingredient with no +2 pairings:
    [ingredients]

    -

    [ingredients]
*/

const fs = require('fs').promises;

//read files in ./unprocessed, write .csv files to ./processed
async function processFiles(path) {
  const fileNames = await fs.readdir(path);

  //for each file in ./unprocessed,
  for (const fileName of fileNames) {
    if (fileName == ".DS_Store") continue;

    //replace file extension (.txt -> .csv)
    const entryName = fileName.substring(0, fileName.length-4) + ".csv";
    const path = "./processed/" + entryName;

    //format text body
    const csvFormattedText = await parseText(fileName);

    console.log("  Writing to file: " + path);
    await fs.writeFile(path, csvFormattedText);
    console.log("  Done!");
  }
}

/*
  Takes a filename,
  formats the file's text into CSV,
  returns csv-formatted text.
*/
async function parseText(fileName) {
  console.log("Reading from file: ./unprocessed/" + fileName);
  const oldText = (await fs.readFile("./unprocessed/" + fileName)).toString();
  //console.log(oldText);
  let csvFormattedText = "pairing,affinity";

  const ingredientGroups = oldText.split("\n\n");

  console.log("  Reformatting text...");
  for (let i=0; i<ingredientGroups.length; i++) {
    if (ingredientGroups[i] == "-") continue;

    csvFormattedText += ingredientsToCsvLines(ingredientGroups[i], 4-i);
  }

  return csvFormattedText;
}

function ingredientsToCsvLines(ingredients, affinity) {
  let formattedText = "";

  const lines = ingredients.trim().split("\n");

  lines.forEach((line) => {
    const fLine = line.replace(" ","_");
    formattedText += ("\n" + fLine + "," + affinity);
  });

  return formattedText;
}

processFiles('./unprocessed');


/*
  CREATE TABLE entryName(pairing VARCHAR(30), affinity int;
  INSERT INTO entryName VALUES values; //(plus3[0],3)...(plus2[0],2)...(plus1[0],1)
    
*/
