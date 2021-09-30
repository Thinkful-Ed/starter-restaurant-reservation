//If a request is made to a route that exists, but the HTTP method is wrong, a 405 error is returned.
function methodNotAllowed() {
    next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  }
  
  module.exports = methodNotAllowed;
  