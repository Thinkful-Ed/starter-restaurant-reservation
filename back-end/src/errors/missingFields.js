function hasRequiredFields(...fields) {
    return function (req, res, next) {
      const { data = {} } = req.body;
      try {
        fields.forEach((property) => {
          if (!data[property]) {
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
  
  module.exports = hasRequiredFields;