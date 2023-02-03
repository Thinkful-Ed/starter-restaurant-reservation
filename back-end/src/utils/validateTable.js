function validTable(){
    return function validateTableInfo(req, res, next) {
        const { data } = req.body;

        switch (true) {
            case typeof(data.capacity) != 'number':
                next({ status:400, message: `capacity must be a number.`});
                break;
            case data.table_name.length <= 1:
                next({ status: 400, message: `table_name must be longer than 1 character.`});
                break;
            default:
                break;
        }

        next();
    }
}

module.exports = validTable;