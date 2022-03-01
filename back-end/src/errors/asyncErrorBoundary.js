// An error boundary to handle resolving a request promise. If something goes wrong, catch and return an error.
function asyncErrorBoundary(delegate, defaultStatus) {
    return (request, response, next) => {
        Promise.resolve()
            .then(() => delegate(request, response, next))
            .catch((error = {}) => {
                const { status = defaultStatus, message = error } = error;
                next({status, message});
            });
    };
}

module.exports = asyncErrorBoundary;