const dateFormat = /\d\d\d\d-\d\d-\d\d/;
const timeFormat = /\d\d:\d\d/;
const numberFormat = /\d/;

 function validDateAndNumber(req,res,next){
    const {reservation_date, reservation_time,people} = req.body.data;
    try{
        if(!dateFormat.test(reservation_date)){
         const error = new Error("reservation_date needs to be a valid date");
         error.status = 400;
         throw error;
    }else if(!timeFormat.test(reservation_time)){
        const error = new Error("reservation_time needs to be a valid time");
        error.status = 400;
        throw error;
    }else if(typeof(people) !== 'number'){
        const error = new Error ("people needs to be a valid number");
        error.status = 400;
        throw error;
    }
    next();
}catch(error){
    next(error)
}
 }

 module.exports = validDateAndNumber;