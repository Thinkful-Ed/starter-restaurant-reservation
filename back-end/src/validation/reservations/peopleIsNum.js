const peopleIsNum = (req, res, next) => {
  typeof req.body.data.people === "number"
    ? next()
    : next({
        status: 400,
        message:
          "'people' must be a number (and cannot be a string) greater than 0.",
      });
};
module.exports = peopleIsNum;
