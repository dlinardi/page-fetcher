const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2,4);
let fileSize = 0;

const inputData = {
  url: args[0],
  path: args[1] 
};

request(`${inputData.url}`, (error, response, body) => {
  fs.writeFile(`${inputData.path}`, body, (err) => {
    if (err) {
      throw err;
    }
    fs.stat(`${inputData.path}` ,(err, stats) => {
      if (err) {
        throw err;
      }
      fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${inputData.path}`);
    });
  });  
});