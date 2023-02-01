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
        
        
        // validate Date/day
        let reservationDay = new Date(data.reservation_date)
        if(reservationDay.getUTCDay() === 2){
            next({ status:400, message: 'Sorry, we are closed on Tuesdays'})
        }





        ///FROM HERE DOWN IS BROKEN??????????
    



        const resYear = reservationDay.getUTCFullYear();
        const resMonth = reservationDay.getUTCMonth();
        const resDay = reservationDay.getUTCDate();

        const todayDate = Date.now()
        // console.log(Date.now())
        console.log(`!!!!!!!!! ${reservationDay}`)
        console.log(reservationDay, todayDate)


    
        if(reservationDay.getUTCDate() < Date.now()){
            next({ status:400, message: 'You can only make reservations for the future.'})
        }


        let reservationTimeHours = reservationDay.getUTCHours();
        let reservationTimeMinutes = reservationDay.getUTCMinutes();
        
    
        if(reservationTimeMinutes < 30){
            if(reservationTimeHours <= 10){
                next({ status:400, message: 'Invalid time'})
            }
        }

        if(reservationTimeMinutes > 30){
            if(reservationTimeHours >= 21){
                next({ status:400, message: 'Invalid time'})
            }
        }

        next();
    }
}

  module.exports = validType;