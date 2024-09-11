const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);

const getIndex = (request, response) => {
  response.writeHead(200, { 
    'Content-Type': 'text/html',
    'Content-Length': Buffer.byteLength(index, 'utf8'),
 });
  response.write(index);
  response.end();
};

module.exports = {
  getIndex,
};
