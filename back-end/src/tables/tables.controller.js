const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

const validateData = (req, res, next) => {
  if (!req.body.data) {
    return next({ status: 400, message: "Body must include a data object" });
  }

  next();
};

const validateBody = (req, res, next) => {
  if (!req.body.data.table_name || req.body.data.table_name === "") {
    return next({ status: 400, message: "'table_name' field cannot be empty" });
  }

  if (req.body.data.table_name.length < 2) {
    return next({
      status: 400,
      message: "'table_name' field must be at least 2 characters",
    });
  }

  if (!req.body.data.capacity || req.body.data.capacity === "") {
    return next({ status: 400, message: "'capacity' field cannot be empty" });
  }

  //if (!Number(req.body.data.capacity)) {
  if (typeof req.body.data.capacity !== "number") {
    return next({ status: 400, message: "'capacity' field must be a number" });
  }

  if (req.body.data.capacity < 1) {
    return next({
      status: 400,
      message: "'capacity' field must be at least 1",
    });
  }

  next();
};

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}

async function create(req, res) {
  req.body.data.status = "free";
  const data = await service.create(req.body.data);
  res.status(201).json({ data: data[0] });
}

//Seats a Table
async function update(req, res) {
  await service.occupy(
    res.locals.table.table_id,
    res.locals.reservation.reservation_id
  );
  await service.updateReservation(
    res.locals.reservation.reservation_id,
    "seated"
  );

  res.status(200).json({ data: { status: "seated" } });
}

//Displays Finished Table
async function destroy(req, res) {
  await service.updateReservation(res.locals.table.reservation_id, "finished");
  await service.free(res.locals.table.table_id);

  res.status(200).json({ data: { status: "finished" } });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [validateBody, validateData, asyncErrorBoundary(create)],
  update: [asyncErrorBoundary(update)],
  destroy: [asyncErrorBoundary(destroy)],
};
