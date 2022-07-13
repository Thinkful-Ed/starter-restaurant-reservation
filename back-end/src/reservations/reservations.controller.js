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

	if (data) {
		for (let field of validFields) {
			if (!data[field]) {
				next({status:400,message:`${field} does not exist`})
			}
		}
	} else {
		next({status:400,message:"Data does not exists"});
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
