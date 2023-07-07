/**
 * import list handler for reservations
 * import error components
 * import service file
 * @format
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

async function list(req, res) {
	res.json({
		data: [],
	});
	console.log(list);
}

console.log(list(req, res));
module.exports = {
	list,
};
