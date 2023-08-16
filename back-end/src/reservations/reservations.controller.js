const reservationsService = require('./reservations.service');

/**
 * List handler for reservation resources
 */

// list all reservations for one date only. (E.g. if the URL is `/dashboard?date=2035-12-30`
//then send a GET to `/reservations?date=2035-12-30` to list the reservations for that date).
//The date is defaulted to today, and the reservations are sorted by time.

async function list(req, res, next) {
	//const { date } = req.query;

	try {
		//const data = await reservationsService.list(date);
		const data = await reservationsService.list();
		res.json({ data });
	} catch (error) {
		next(error);
	}
}

module.exports = {
	list,
};
