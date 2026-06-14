'use strict'
var fs = require("fs");

/***
 * implementation of readFileSync
 */
var data = fs.readFileSync('file.txt');
console.log(data.toString());
console.log("Program Ended");

/***
 * implementation of readFile 
 */
fs.readFile('file.txt', function (err, data) {
    if (err) return console.error(err);
   console.log(data.toString());
});

console.log("Program Endeddd");