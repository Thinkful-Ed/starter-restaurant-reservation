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
    
        // console.log(thisDay)
        // console.log(thisDay.getUTCDay())
    

        let thisDay = new Date(data.reservation_date)
        if(thisDay.getUTCDay() === 2){
            next({ status:400, message: 'Sorry, we are closed on Tuesday'})
        }

        if(thisDay.getUTCDate() < Date.now()){
            next({ status:400, message: 'You can only make reservations for the future.'})
        }
        next();
    }
}

  module.exports = validType;