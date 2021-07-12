const validStatus = (req, res, next) => {
  const { status } = req.body.data;
  const validEntries = ["booked", "seated", "finished"];

  return validEntries.includes(status)
    ? next()
    : next({
        status: 400,
        message: `Invalid status: '${status}'. The status must be a string that exactly matches one of the following: ${validEntries
          .map((entry) => `'${entry}'`)
          .join(", ")}.`,
      });
};

module.exports = validStatus;
