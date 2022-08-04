//  Creates a middleware function that validates that req.body.data has the specified non-falsey properties.

function hasProperties(...properties) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    errorMessages = [];

    try {
      properties.forEach((property) => {
        const value = data[property];
        if (!value) {
          errorMessages.push(`A '${property}' field is required. `);
        }

        if (property === "reservation_date" && value) {
          const reservation_date = new Date(value);
          if (Number.isNaN(reservation_date.getTime())) {
            errorMessages.push(
              `The reservation date ${property} is not valid.`
            );
          } else {
            null;
          }
        }

        if (property === "reservation_time" && value) {
          const reservation_time = new Date(
            `${data["reservation_date"]} ${value}`
          );
          if (Number.isNaN(reservation_time.getTime())) {
            errorMessages.push(
              `The reservation time ${property} is not valid.`
            );
          } else {
            null;
          }
        }
        if (property === "people" && value) {
          if (typeof value !== "number") {
            errorMessages.push(
              `The people field should be a number. ${typeof value}`
            );
          } else if (typeof value === "number" && value <= 0) {
            errorMessages.push(
              "The people field requires at least one person."
            );
          }
        }
        if (property === "reservation_date" && value) {
          const reservation_date = value;
          const date_from_string = new Date(
            `${reservation_date} ${data["reservation_time"]}`
          );
          if (date_from_string.getDay() === 2) {
            errorMessages.push(
              `Your reservation date is set for a Tuesday, and we are closed on Tuesday's.`
            );
          }
        }
        if (property === "reservation_date" && value) {
          const reservation_date = value;
          const date_from_string = new Date(
            `${reservation_date} ${data["reservation_time"]}`
          );
          if (date_from_string < new Date().getTime()) {
            errorMessages.push(
              `Your reservation date, ${reservation_date} is in the past, only future reservations are allowed.`
            );
          }
        }
        if (property === "reservation_time" && value) {
          let currentTime = new Date();

          if (value < "10:30") {
            errorMessages.push(
              `Your reservation time for ${value} is before we open. Please choose a time when we are opened.`
            );
          } else if (value > "21:30") {
            errorMessages.push(
              `The restaurant closes at 10:30pm. Please choose a reservation time that is not so close to closing.`
            );
          } else if (
            data["reservation_date"] ===
              currentTime.toISOString().split("T")[0] &&
            `${currentTime.getHours()}:${currentTime.getMinutes()}` > value
          ) {
            errorMessages.push(
              `Sorry but the reservation time has already passed for today. Please choose a time in the future. `
            );
          }
        }
      });

      if (errorMessages.length > 0) {
        next({
          status: 400,
          message: errorMessages.join("\n"),
        });
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
