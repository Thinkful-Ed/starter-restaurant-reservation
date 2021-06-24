const hasFields = (fields) => (req, res, next) => {
  const strikes = [];
  for (let field of fields) {
    if (!req.body.data[field]) strikes.push(field);
  }
  return strikes.length
    ? next({
        status: 400,
        message: `Request data must have the following fields: ${strikes.join(
          ", "
        )}.`,
      })
    : next();
};

module.exports = hasFields;
