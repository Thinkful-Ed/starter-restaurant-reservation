/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");

//----------------HELPER FUNCTIONS----------------

function checkValidFields(req, res, next) {
	const validFields = [
		"first_name",
		"last_name",
		"mobile_number",
		"reservation_date",
		"reservation_time",
		"people",
	];
  const {data} = req.body
	console.log(data);
	if (!data) {
		res.sendStatus(400);
	}

	if (data) {
		for (let field of validFields) {
			if (!data[field]) {
				res.sendStatus(400);
			}
		}
	} else {
		res.sendStatus(400);
	}
	return next();
}

//-----------------CRUD FUNCTIONS-----------------
async function list(req, res) {
	const queryDate = req.query;
	const data = await service.list(queryDate.date);

	res.json({
		data: data,
	});
}

async function create(req, res, next) {
	const { data } = req.body;
	const responseData = await service.create(data);
	res.status(201).send({ data: responseData });
}

module.exports = {
	list,
	create:[checkValidFields,create],
};
