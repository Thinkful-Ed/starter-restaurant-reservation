const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  if (date) {
    res.json({
      data: await service.listReservations(date),
    });
  } else {
    const currentDate = new Date();
    const currentDateString = `${currentDate.getFullYear().toString(10)}-${(
      currentDate.getMonth() + 1
    )
      .toString(10)
      .padStart(2, "0")}-${currentDate
      .getDate()
      .toString(10)
      .padStart(2, "0")}`;
    res.json({ data: await service.listReservations(currentDateString) });
  }
}

function hasContent(req, res, next) {
  const { data } = req.body;
  const contents = Object.values(data);
  const hasContent = contents.every((content) => content);
  if (hasContent) {
    next();
  } else {
    const emptyProp = [];
    for (const prop in data) {
      if (!data[prop] || data[prop] <= 0) {
        emptyProp.push(prop);
      }
    }
    next({ status: 400, message: `Missing ${emptyProp}` });
  }
}

function hasRequiredProps(req, res, next) {
  const { data } = req.body;
  const requiredProps = [
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ];
  const props = Object.keys(data);
  const hasProps = requiredProps.every((prop) => {
    return props.includes(prop);
  });
  if (hasProps) {
    next();
  } else {
    const missingProps = requiredProps.filter((prop) => !props.includes(prop));
    if (missingProps.length > 0)
      next({
        status: 400,
        message: `You are missing the ${missingProps} property`,
      });
  }
}

function notPast(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const [hour, min] = reservation_time.split(":");
  const postDate = new Date(year, month - 1, day);
  postDate.setHours(hour, min);
  const todayDate = new Date();
  if (todayDate.getTime() < postDate.getTime()) {
    next();
  } else {
    next({
      status: 400,
      message: "Must set reservation on a future date and time",
    });
  }
}

function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const [year, month, day] = reservation_date.split("-");
  const postDate = new Date(year, month - 1, day);
  const dayOfWeek = postDate.getDay();
  if (dayOfWeek !== 2) {
    next();
  } else {
    next({ status: 400, message: "The restaurant is closed on tuesdays" });
  }
}

function isOpen(req, res, next) {
  const {reservation_time} = req.body.data
  const [hour, min] = reservation_time.split(':')
  console.log(hour)
  console.log(Math.trunc(min))
  if((hour < 21 && hour > 10) || (hour == 10 && min >= 30) || (hour == 21 && min <= 30)) {
    next()
  }
  else {
    next({status: 400, message: 'The reservation does not fall in the premited times'})
  }
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    hasRequiredProps,
    hasContent,
    notTuesday,
    notPast,
    isOpen,
    asyncErrorBoundary(create),
  ],
};
