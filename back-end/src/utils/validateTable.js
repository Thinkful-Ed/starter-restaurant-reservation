function validTable(){
    return function validateTableInfo(req, res, next) {
        const { data } = req.body;

        if(typeof(data.capacity) !== 'number'){
            next({ status:400, message: 'capacity must be a number'});
        };

        if(data.table_name.length <= 1) {
            next({ status:400, message: 'table_name must be longer than 1 character'})
        }
        next();
    }
}

module.exports = validTable;