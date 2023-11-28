function hasValidProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    try {
      //RESERVATION DATE
      const reservationDate = data["reservation_date"];

      //checks if reservation date is a date
      if (reservationDate.match(/^\d{4}-\d{2}-\d{2}$/) === null) {
        const error = new Error(`A valid reservation_date is required.`);
        error.status = 400;
        throw error;
      }

      //checks if reservation date is not a tuesday
      const resDateAsDateObject = new Date(reservationDate);
      if (resDateAsDateObject.getDay() === 1) {
        const error = new Error(
          `The reservation_date can't be a tuesday since the restaurant is closed on Tuesdays.`
        );
        error.status = 400;
        throw error;
      }

      //checks if a reservation date is a future date
      const today = new Date();
      if (resDateAsDateObject < today) {
        const error = new Error(`The reservation_date must be a future date.`);
        error.status = 400;
        throw error;
      }

      console.log("today", today);
      console.log("resDateAsObject", resDateAsDateObject);

      //RESERVATION TIME
      //checks time is in the right format
      const reservationTime = data["reservation_time"];
      if (
        reservationTime.match(/^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/) === null
      ) {
        const error = new Error(`A valid reservation_time is required.`);
        error.status = 400;
        throw error;
      }

      //extracts hour and minute from time object
      const time = data["reservation_time"];
      const timeSplit = time.split(":");
      const reservationHour = Number(timeSplit[0]);
      const reservationMinutes = Number(timeSplit[1]);
      if (
        reservationHour < 10 ||
        (reservationHour === 10 && reservationMinutes < 30)
      ) {
        const error = new Error(
          `The reservation_time must be after opening at 10:30AM.`
        );
        error.status = 400;
        throw error;
      }
      if (
        reservationHour > 21 ||
        (reservationHour === 21 && reservationMinutes >= 31)
      ) {
        const error = new Error(
          `The reservation_time must be at least 1 hour before closing at 9:30PM.`
        );
        error.status = 400;
        throw error;
      }

      //PARTY SIZE
      //checks that people is a number
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
