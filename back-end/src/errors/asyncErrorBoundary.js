function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
      Promise.resolve()
        .then(() => delegate(request, response, next))
        .catch((error = {}) => {
          console.log(error) //added here to read errors
          const { status = defaultStatus, message = error } = error;
          next({
            status,
            message,
          });
        });
    };
  }
  
  module.exports = asyncErrorBoundary;