/**
 * Creates a middleware function that validates that req.body.data has properties for creating a table.
 * @returns {function(*, *, *): void}
 *    a middleware function that validates that req.body.data has the valid properties for creating a table.
 */

function hasValidTableProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    try {
      const table_name = data["table_name"];

      //makes sure the table name has at least two characters
      if (table_name.match(/\S{2}/) === null) {
        const error = new Error(
          `The table_name must have at least 2 characters.`
        );
        error.status = 400;
        throw error;
      }

      //makes sure that capacity is a number
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
