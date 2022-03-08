const tablesService = require("../tables/tables.service");

async function removeSeatValidator(req, res, next) {
  const { table_id } = req.params;

  const data = await tablesService.read(table_id);
  if (!data)
    next({ status: 404, message: `Table id ${table_id} does not exist.` });

  const { reservation_id } = data;
  if (!reservation_id) {
    next({
      status: 400,
      message: "The table is not occupied.",
    });
  }

  next();
}

module.exports = removeSeatValidator;
