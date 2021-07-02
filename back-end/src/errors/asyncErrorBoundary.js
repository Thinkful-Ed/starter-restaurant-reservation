//my own version of error boundry
function asyncErrorBoundary(delegate,defaultStatus){
    return (req, res, next)=>{
        try{
            req.log.debug({__filename, methodeName:"asyncErrorBoundary"});
            delegate (req, res, next);
        }
        catch(error){
            const { status=defaultStatus, message=error || "Internal Server Error" } = error;
            req.log.trace({ __filename, methodeName:"asyncErrorBoundary", error });
            next({
                status,
                message,
            });
        }
    }
}

module.exports = asyncErrorBoundary;
