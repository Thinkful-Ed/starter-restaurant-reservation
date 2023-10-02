function hasProperties(...properties){
    return (req,res,next)=>{
        const {data={}} = req.body;
        try{
            properties.forEach(p=>{
                const value = data[p];
                if(!value){
                    const error = new Error(`${p} property is required.`);
                    error.status = 400;
                    throw error;
                };
            });
            next();

        }catch(error){
            next(error)
        }
    }
}

module.exports = hasProperties;