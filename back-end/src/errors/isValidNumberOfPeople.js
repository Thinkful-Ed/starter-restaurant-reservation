function isValidNumberOfPeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (typeof people !== "number" || people < 1) {
    next({
      status: 400,
      message: `people should be an integer greater than 0`,
    });
  } else next();
}

module.exports = isValidNumberOfPeople;
