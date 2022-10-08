//load packages
const sqlite3 = requite('sqlite3');
const fs = require('fs');
const express = require('express');

//server initialization:
const app = express();                              //start application
app.listen(3000,                                    //start listening for requests
    ()=> console.log("Listening at port 3000.")
);
app.use(express.static('public'));


//database stuff