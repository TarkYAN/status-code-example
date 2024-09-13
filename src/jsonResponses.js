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

//    /badRequest?value=true -> 200
//    /badRequest?value=false -> 400
//    /badRequest -> 400
const badRequest = (request, response) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if(!request.query.valid || request.query.valid !== 'true'){
    //send back 400
    responseJSON.message = 'Missing valid query param set to true';
    responseJSON.id = 'badRequestMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  //otherwise send 200
  return respondJSON(request, response, 200, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseJSON);
};

module.exports = {
  success,
  badRequest,
  notFound,
};
