const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

// async function postExists(req, res, next) {
//   const { postId } = req.params;

//   const post = await service.read(postId);
//   if (post) {
//     res.locals.post = post;
//     return next();
//   }
//   return next({ status: 404, message: `Post cannot be found.` });
// }

async function create(req, res, next) {
  if (!req.body.data) {
    return next({ status: 400, message: "Reservation lacks required data." });
  }

  const {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  } = req.body.data;

  if (first_name === "") {
    return next({ status: 400, message: "Reservation lacks required data." });
  }

  const result = await service.create({
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  });
  res.status(201);
  res.json({ data: result });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: asyncErrorBoundary(create),
};
