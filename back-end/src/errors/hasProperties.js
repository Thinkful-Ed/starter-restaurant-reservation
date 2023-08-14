function hasProperties(...properties) {
    return function (req, res, next) {
      const { body = {} } = req;
  
      try {
        properties.forEach((property) => {
          const value = body[property];
          if (!value) {
            const error = new Error(`A '${property}' property is required.`);
            error.status = 400;
            throw error;
          }
        });
        next();
      } catch (error) {
        next(error);
      }
    };
  }

  module.exports = hasProperties