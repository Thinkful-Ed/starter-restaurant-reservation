function methodNotAllowed(req, res, next){
    next({
        status : 405,
        message : `${req.method} is not allowed for the path ${req.originalUrl}`,
    });
}

module.exports = methodNotAllowed;