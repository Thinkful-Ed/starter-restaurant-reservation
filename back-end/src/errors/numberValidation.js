//check if number is 0 or not a number
function numberValidation(req,res,next){
    const methodName = 'numberValidation';
  req.log.debug({__filename, methodName, body:req.body})
    const {capacity} = req.body.data;
    if(typeof(capacity) !== 'number' || capacity === 0){
        next({
            status:400,
            message:"capacity should be a number and bigger than zero."
        })
    };
   
    next();
}

module.exports = numberValidation;