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

        // console.log(`RESERVATIONDAY DATE${reservationDay}`)


/**     reservationDay --> Tue Dec 31 2024 19:00:00 GMT-0500 (Eastern Standard Time)
 *      Date.now()  --> 1675294729286
 *   
 * 
 */
        const todayDateLong = Date.now();
        const todayDate = new Date(todayDateLong);      //Wed Feb 01 2023 18:42:11 GMT-0500 (Eastern Standard Time)


        const resYear = reservationDay.getUTCFullYear();
        const resMonth = reservationDay.getUTCMonth();
        const resDay = reservationDay.getUTCDate();

        const thisYear = todayDate.getUTCFullYear();
        const thisMonth = todayDate.getUTCMonth();
        const thisDay = todayDate.getUTCDate();
    
    
/**
 *       if resYear > thisYear       good
 *      if resYear = thisyear && resMonth > thisMonth       good
 *       if resYear=thisyear && resMonth=thisMonth && resDay > this Day     good
 * 
 * if this year is > res year gone
 * if this year === res year but this month is greather than gone
 */

        if(thisYear > resYear){
            next({ status:400, message: 'You can only make reservations for the future.'})
        } 
        if(thisYear == resYear && thisMonth > resMonth){
            next({ status:400, message: 'You can only make reservations for the future.'})
        }
        if(thisYear == resYear && thisDay > resDay){
            next({ status:400, message: 'You can only make reservations for the future.'})
        }


        const reservationTime = data.reservation_time;
        const reservationTimeHours = reservationTime.slice(0,2);
        const reservationTimeMinutes = reservationTime.slice(3,5)
       
    
        if(reservationTimeMinutes <= 30){
            if(reservationTimeHours <= 10){
                next({ status:400, message: 'Invalid time'})
            }
        }

        if(reservationTimeMinutes >= 30){
            if(reservationTimeHours >= 21){
                next({ status:400, message: 'Invalid time'})
            }
        }

        next();
    }
}

  module.exports = validType;