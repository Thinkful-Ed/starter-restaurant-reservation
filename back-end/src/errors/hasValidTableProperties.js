function hasValidTableProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      //table_name
      const table_name = data["table_name"];

      //checks if table name has at least two characters
      if (table_name.match(/\S{2}/) === null) {
        const error = new Error(
          `The table_name must have at least 2 characters.`
        );
        error.status = 400;
        throw error;
      }

      //checks if capacity is a number
      const capacity = data["capacity"];
      if (typeof capacity !== "number") {
        const error = new Error(`The capacity must be a number.`);
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
