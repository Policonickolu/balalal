const fs = require('fs');

exports.readFile = function(filePath){

  return fs.readFileSync(filePath, 'utf-8', (err, data) => {
            if (err) throw err;
            console.log(data);
          }).split('\n').filter(Boolean);

};

exports.writeFile = function(content, filePath){

  fs.writeFileSync(filePath, content.join('\n'), 'utf-8', (err, data) => {
              if (err) throw err;
              console.log(data);
            }); 

};