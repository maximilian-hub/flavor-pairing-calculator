/*
  This is a tool intended to assist me
  with data entry for my Flavor Pairing
  Calculator.

  It reads the "raw" files, applies 
  replacement rules where it can, 
  prompts me for new rules where it 
  can't, and writes the results to 
  a "parcooked" file.

  Replacement rules are like:
  "lemon, juice" -> "lemon"
  "gmger" -> "ginger"
  "hot beverage" -> "coffee\ntea\nhot chocolate"
*/

//globals
window.onload = init();
let fileList; // to hold the staged files

function init() {
  const fileSelector = document.getElementById("file-selector");
  fileSelector.addEventListener('change', (event) => {
    loadFiles(event.target.files);
  });



  const fr = new FileReader;
  fr.addEventListener('load', ()=>{
    const fileText = fr.result;
    console.log(fileText);
  })
}

function processFiles(fileNames) {
  console.log(fileNames);
}

function loadFiles(files) {
  console.log("loaded files.");
  fileList = files;
  displayLoadedFiles();
}

function displayLoadedFiles() {
  let loadedFilesText = "";
  
  for (let i=0; i<fileList.length; i++) {
    loadedFilesText += fileList[i].name + "&#10";  //html linefeed character literal
  }
  
  const loadedFilesDisplayArea = document.getElementById("textarea-loaded-files");
  loadedFilesDisplayArea.innerHTML = loadedFilesText;
}

async function processLines(path) {

}
