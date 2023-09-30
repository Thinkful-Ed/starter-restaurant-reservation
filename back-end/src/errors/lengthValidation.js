function lengthValidation(req,res,next){
  const methodName = 'lengthValidation';
  req.log.debug({__filename, methodName, body:req.body})
  const {table_name} = req.body.data;
  if(table_name.length <= 1){
    next({
        status:400,
        message:"table_name is too short."
    })
  }
  next();
}

module.exports = lengthValidation;