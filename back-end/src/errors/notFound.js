/**
 * Express API "Not found" handler.
 */
function notFound(req, _res, next) {
  next({ status: 404, message: `Path not found: ${req.originalUrl}` });
}

module.exports = notFound;
