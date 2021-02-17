/**
 * List handler for reservation resources
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function list(req, res) {
  res.json({
    data: [],
  });
}

module.exports = {
  list,
};
