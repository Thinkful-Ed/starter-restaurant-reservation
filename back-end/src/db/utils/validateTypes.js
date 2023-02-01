function validType(){
    return function validateTypes(req, res, next){
        const { data } = req.body;
        // regular expression to match required date format
        const reDate = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
        // regular expression to match required time format
        const reTime = /^\d{1,2}:\d{2}([ap]m)?$/;
        
        if(typeof(data.people) !== 'number'){
        next({ status:400, message: 'people must be a number.'})
        };
    
        if(!data.reservation_date.match(reDate)) {
        next({ status:400, message: 'Please enter a valid reservation_date.'})
        };
    
        if(!data.reservation_time.match(reTime)) {
        next({ status:400, message: 'Please enter a valid reservation_time.'})
        };
    
        next();
    }
}

  module.exports = validType;