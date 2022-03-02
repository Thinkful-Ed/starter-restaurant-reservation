function methodNotAllowed(req, res, next) {
    //creates 405 error message for all requests that are not allowed
    next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  };
  
  
  module.exports = methodNotAllowed;