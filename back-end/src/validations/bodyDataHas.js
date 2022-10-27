function bodyDataHas(property) {
  return (req, res, next) => {
    const { data = {} } = req.body;
    res.locals.data = data;
    if (data[property]) {
      return next();
    }
    next({
      status: 400,
      message: `ERROR: Request must have a: ${property}.`,
    });
  };
}

module.exports = bodyDataHas;
