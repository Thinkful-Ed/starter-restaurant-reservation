// @params 2023-09-26T21:01:59.971Z
//@return yyyy-mm-dd
function datePassed(req,res,next) {
  const {reservation_date} = req.body.data;
  const currentDate = new Date();
  const today = `${currentDate.getFullYear().toString(10)}-${(
    currentDate.getMonth() + 1
  )
    .toString(10)
    .padStart(2, "0")}-${currentDate.getDate().toString(10).padStart(2, "0")}`;
    try {
      if(reservation_date < today){
        const error = new Error(`We are in the future of this date ${reservation_date}.`);
         error.status = 400;
        throw error;
      }
      next();
    } catch (error) {
      next(error);
    }

}

module.exports = datePassed;



