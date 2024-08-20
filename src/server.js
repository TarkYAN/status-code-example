const http = require('http');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/success': jsonHandler.success,
  '/badRequest': jsonHandler.badRequest,
  notFound: jsonHandler.notFound,
};

const onRequest = (request, response) => {
  const protocol = request.connection.encrypted ? 'https' : 'http';
  const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);

  const handlerFunc = urlStruct[parsedUrl.pathname];
  if (handlerFunc) {
    handlerFunc(request, response);
  } else {
    urlStruct.notFound(request, response);
  }

};

http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1: ${port}`);
});
