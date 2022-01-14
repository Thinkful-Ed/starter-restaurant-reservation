const service = require("./reservations.service");

async function create(req, res) {
  const data = await service.create(req.body.data);
  res.send({ data });
}

async function list (req, res) {
  const reservation_date = req.params.date ?? (new Date).toISOString().split("T")[0];
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
  create,
};
