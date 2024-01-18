function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      properties.forEach((property) => {
        if (!data[property]) {
          const error = new Error(`A "${property}" is required`);
          error.status = 400;
          throw error;
        }
      });
      res.locals.data = data;

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
