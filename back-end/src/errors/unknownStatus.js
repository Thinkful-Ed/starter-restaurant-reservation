function unknownStatus(req,res,next){
  const {status}= req.body.data;
  if(status === 'unknown'){
    next({
        status:400,
        message:`the reservations status is ${status}`
    })
  }else{
    next();
  }
}

module.exports = unknownStatus;