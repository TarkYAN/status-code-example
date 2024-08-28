const respondJSON = (request, response, status, object) => {
  const content = JSON.stringify(object);
  response.writeHead(status, { 
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(content, 'utf8'),
  });
  response.write(content);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  return respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

};

module.exports = {
  success,
  badRequest,
  notFound,
};
