function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.orginalUrl}`,
  });
}

module.exports = methodNotAllowed;
