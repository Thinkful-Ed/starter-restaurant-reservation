function MethodNotAllowed(req, res, next){
    return next({
        status:405,
        message: `${req.method} nod allowed for ${req.originalUrl}`
    })
}

module.exports = MethodNotAllowed;