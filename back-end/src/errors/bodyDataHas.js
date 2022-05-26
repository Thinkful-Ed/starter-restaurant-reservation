function bodyDataHas(propertyName){
    return function(req, res, next){
        const {data ={} } = req.body;
        data[propertyName] ? next() : next({status: 400, message: `${propertyName === "people" || data.people < 1 ? "Reservation must include a people property with a value greater than 0." : "Reservation must include a " + propertyName}`});
    }
}

module.exports = bodyDataHas;