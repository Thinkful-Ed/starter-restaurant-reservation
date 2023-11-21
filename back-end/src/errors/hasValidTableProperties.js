function hasValidTableProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      //table_name
      const table_name = data["table_name"];

      //checks if reservation date is a date
      if (table_name.match(/\S\S{2}/) === null) {
        const error = new Error(`Table_name must have at least 2 characters.`);
        error.status = 400;
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidTableProperties;
