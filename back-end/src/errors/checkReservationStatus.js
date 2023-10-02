const falseStatus = ['seated','finished'];

function checkReservationStatus(req,res,next){
  const {status} = req.body.data;
  if(falseStatus.includes(status)){
    next({
        status:400,
        message:`The reservation is ${status}`
    })
  }else{
    next();
  }

}

module.exports = checkReservationStatus;