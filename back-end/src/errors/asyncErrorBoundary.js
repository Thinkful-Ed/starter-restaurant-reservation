// function asyncErrorBoundary(delegate, defaultStatus) {
//   return (request, response, next) => {
//     Promise.resolve()
//       .then(() => delegate(request, response, next))
//       .catch((error = {}) => {
//         const { status = defaultStatus, message = error } = error;
//         next({
//           status,
//           message,
//         });
//       });
//   };
// }

// module.exports = asyncErrorBoundary;
//shorter async error handler using async/await with a try/catch
function asyncErrorBoundary(delegate, defaultStatus) {
  return async (req, res, next) => {
    try {
      await delegate(req, res, next);
    } catch (error) {
      const { status = defaultStatus, message = error } = error;
      next({ status, message });
    }
  };
}

module.exports = asyncErrorBoundary;
