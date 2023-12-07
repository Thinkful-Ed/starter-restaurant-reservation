function validatesReservationPartySize(people) {
  //checks that people is a number
  if (typeof people !== "number" || people <= 0) {
    const error = new Error(
      `A valid number for people is required. ${
        typeof people !== "number"
      } ${people}`
    );
    error.status = 400;
    throw error;
  }
}

module.exports = validatesReservationPartySize;
