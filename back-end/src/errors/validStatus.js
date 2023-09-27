const valid = ['booked','seated','finished','cancelled']
function validStatus(req,res,next){
  const {status} = req.body.data;
  if(valid.includes(status)){
    next()
  }else{
    next({
        status:400,
        message:`${status} status is not valid.`
    })
  }
}
module.exports = validStatus;