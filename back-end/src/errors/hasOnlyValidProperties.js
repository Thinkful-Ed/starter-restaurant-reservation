function hasOnlyValidProperties(validProperties) {
    return function (req, res, next) {
        const { data = {} } = req.body;
        const properties = Object.keys(data);
        const invalid = properties.filter(prop => !validProperties.includes(prop));
        if (invalid.length) {
            next({ status: 400, message: `Invalid fields: ${invalid.join(", ")}` });
        } else {
            next();
        }
    }
}

module.exports = hasOnlyValidProperties
