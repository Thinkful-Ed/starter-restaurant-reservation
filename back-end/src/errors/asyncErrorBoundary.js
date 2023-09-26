function asyncErrorBoundary(delegate){
    return (req,res,next)=>{
        Promise.resolve()
               .then(()=>delegate(req,res,next))
               .catch((error={})=>{
                  const {status=500,message=error} = error;
                  next({
                    status,
                    message
                  })
               })
    }
}
module.exports = asyncErrorBoundary;