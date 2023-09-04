function asyncErrorBoundary(delgate, defaultStatus) {
    return (req, res, next) => {
        Promise.resolve()
        .then(() => delgate(req, res, next))
        .catch((error = {}) => {
            const { status = defaultStatus, message = error } = error;
            next({
                status,
                message,
            })
        });
    }
}

module.exports = asyncErrorBoundary;