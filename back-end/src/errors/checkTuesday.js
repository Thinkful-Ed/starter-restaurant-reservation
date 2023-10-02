//@params yyyy-mm-dd
//@return true if it's Tuesday, false not Tuesday
function checkTuesday(req, res, next) {
  const methodName = 'checkTuesday';
  req.log.debug({__filename, methodName, body:req.body})
  const {reservation_date} = req.body.data;
  let date = new Date(reservation_date);
  try {
    if (date.getUTCDay() === 2) {
      const error = new Error("Sorry, our restaurant is closed on Tuesday");
      error.status = 400;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = checkTuesday;
