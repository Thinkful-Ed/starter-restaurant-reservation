const service = require("./reservations.service");

function validReservation(req, res, next) {
  const reservation = req.body.data;
  if (!reservation) next({"status": 400, "message": "No data was sent."})
  const fields = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];
  
  errorMessage = fields.reduce((acc, field) => {
    if (field === "reservation_date" && !reservation[field]?.match(/\d{4}-(0[1-9]|1[0-2])-([0][1-9]|[12][0-9]|[3][01])/)) {
        acc.push(field);
    } else if (field === "reservation_time" && !reservation[field]?.match(/([0-9]|1[0-9]|2[0-3]):([0-6][0-9])/)) {
        acc.push(field);
    } else if (field === "people" && !Number.isInteger(reservation[field])) {
      acc.push(field);
    } else if (!reservation[field]) {
      acc.push(field);
    }
    return acc;
  }, [])

  if (errorMessage.length) next({"status": 400, "message": "Incorrect fields: " + errorMessage.join(", ")})
  next()
}

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.status("201").send({ data });
}

async function list (req, res) {
  const reservation_date = req.query.date ?? (new Date).toISOString().split("T")[0];
  const data = await service.list(reservation_date);
  data.sort((reservationA, reservationB) => {
    const dateA = reservationA.reservation_date.replace("-", "");
    const dateB = reservationB.reservation_date.replace("-", "");
    const timeA = reservationA.reservation_time.replace(":", "");
    const timeB = reservationB.reservation_time.replace(":", "");
    
    return dateA - dateB
      ? dateA - dateB
      : timeA - timeB;
  })
  res.json({data});
}

module.exports = {
  list,
  create : [validReservation, create],
};
