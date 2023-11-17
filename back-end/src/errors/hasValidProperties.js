function hasValidProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      //reservation date
      const reservationDate = data["reservation_date"];
      if (reservationDate.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
        const error = new Error(`A valid reservation_date is required.`);
        error.status = 400;
        throw error;
      }
      //reservation time
      const reservationTime = data["reservation_time"];
      if (
        reservationTime.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/) === null
      ) {
        const error = new Error(`A valid reservation_time is required.`);
        error.status = 400;
        throw error;
      }
      //people is anumber
      const people = data["people"];

      if (typeof people !== "number" || people <= 0) {
        const error = new Error(
          `A valid number for people is required. ${
            typeof people !== "number"
          } ${data["people"]}`
        );
        error.status = 400;
        throw error;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasValidProperties;
