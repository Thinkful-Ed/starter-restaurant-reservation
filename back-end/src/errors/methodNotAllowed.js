//method not allowed function
function methodNotAllowed(req, res) {
    res.status(405).send("Method not allowed");
    }
module.exports = methodNotAllowed;