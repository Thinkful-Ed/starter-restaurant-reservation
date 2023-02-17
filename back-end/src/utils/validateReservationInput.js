function validType() {
    return function validateTypes(req, _res, next){
        const { data } = req.body;
        // regex to match required date format
        const reDate = /^(\d{4})-(\d{1,2})-(\d{1,2})/;
        // regex to match required time format
        const reTime = /^[0-9]{2}:[0-9]{2}/
        // regex to match phone number format
        const rePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/


        const reservationDate = new Date(data.reservation_date);

        const fullReservationDate = new Date(`${data.reservation_date}T${data.reservation_time}:00`);
        const todaysDate = new Date();

        const reservationTime = data.reservation_time;
        const reservationTimeHours = reservationTime.slice(0,2);
        const reservationTimeMinutes = reservationTime.slice(3,5);
        
        let errorMessage = '';

        switch (true) {
            case typeof(data.people) !== 'number':
                errorMessage = 'people must be a number.';
                break;
            case !data.reservation_date.match(reDate):
                errorMessage = 'reservation_date is an invalid format.  Please use YYYY:MM:DD format.';
                break;
            case !data.reservation_time.match(reTime):
                errorMessage = `reservation_time is an invalid format.`;
                break;
            case !data.mobile_number.match(rePhone):
                errorMessage = 'phone number is invalid.';
            case reservationDate.getUTCDay() === 2:
                errorMessage = 'Sorry, we are closed on Tuesdays.';
                break;
            case fullReservationDate < todaysDate:
                errorMessage = `You can only make reservations for the future.  Todays date is ${todaysDate}, fullReservationDate is ${fullReservationDate}`;
                break;
            case reservationTimeHours > 21:
                errorMessage = `Invalid time.`
                break;
            case reservationTimeHours == 21 && reservationTimeMinutes >= 30:
                errorMessage = `Invalid time.`
                break;
            case reservationTimeHours < 10:
                errorMessage = `Invalid time.`
                break;
            case reservationTimeHours == 10 && reservationTimeMinutes <= 30:
                errorMessage = `Invalid time.`
                break;    
            default:
                break;            
        }

        if(errorMessage){
            next({ status: 400, message: `${errorMessage}`});
        };
        next();
    }
}


module.exports = validType;