const hasDataProp = (req, res, next) => {
  if (!req.body.data)
    return next({
      status: 400,
      message: "Request body must have a data field.",
    });
  next();
};

module.exports = hasDataProp;
