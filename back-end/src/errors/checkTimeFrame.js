function checkTimeFrame(req,res,next){
    const methodName = 'checkTimeFrame';
    req.log.debug({__filename, methodName, body:req.body})
    const {reservation_time} = req.body.data;
    // const currentDate = new Date();
    // const currentTime = `${currentDate.getUTCHours()}:${currentDate.getUTCMinutes()}:${currentDate.getUTCSeconds()}`
    try{
        if(reservation_time < "10:30:00" || reservation_time > "21:30:00"){
            const error = new Error("Cannot make a reservation at this time.")
            error.status = 400;
            throw error;
        };
        next();
    }
    catch(error){
        next(error)
    }
}

module.exports = checkTimeFrame;