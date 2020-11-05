const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2,4);
let fileSize = 0;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const inputData = {
  url: args[0],
  path: args[1] 
};

const saveFile = (path, body) => {
  fs.writeFile(`${path}`, body, (err) => {
    fs.stat(`${path}` ,(err, stats) => {
      if (err) {
        throw err;
      }
      fileSize = stats.size;
      console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
    });
  });
};

request(`${inputData.url}`, (error, response, body) => {
  if (!error) {
    fs.exists(`${inputData.path}`, (exists) => {
      // check if file exists
      // prompt user if it does.
      if (exists) {
        console.log('File already exists...');
        rl.question(`Would you like to overwrite ${inputData.path}? (y/n) `, (answer) => {
          answer = answer.toLowerCase();
          if (answer === 'y') {
            saveFile(`${inputData.path}`, body);
            return rl.close();
          } else if (answer === 'n') {
            console.log('Download stopped.');
            return rl.close();
          }
        });
      } else {
        // if file doesn't exist, automatically
        // save file to specified path.
        saveFile(`${inputData.path}`, body);
      }
    });
  } else {
    throw error;
  }
});