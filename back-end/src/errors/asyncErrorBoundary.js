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