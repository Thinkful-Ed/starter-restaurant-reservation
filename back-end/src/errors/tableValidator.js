const properties = ["table_name", "capacity"];

function tableValidator(req, res, next) {
  const { data = null } = req.body;
  if (!data) return next({ status: 400, message: "data is required." });
  const { table_name, capacity } = data;
  const missing = [];
  properties.forEach((property) => {
    const value = data[property];
    if (!value || value.length === 0) {
      missing.push(property);
    }
  });

  if (missing.length > 0)
    next({ status: 400, message: `${missing.join(", ")} is required.` });

  if (table_name.length < 2)
    next({
      status: 400,
      message: "table_name field must be more than 2 characters",
    });

  if (typeof capacity !== "number")
    next({
      status: 400,
      message: "capacity field should be a number",
    });

  if (capacity <= 0)
    next({
      status: 400,
      message: "capacity field must be greater than 0",
    });

  next();
}

module.exports = tableValidator;
