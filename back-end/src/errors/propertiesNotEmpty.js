function propertiesNotEmpty(...properties){
    return (req,res,next)=>{
        const {data={}} = req.body;
        try{
            properties.forEach(p=>{
                const value = data[p];
                if(value.length === 0){
                    const error = new Error(`${p} property cannot be empty`);
                    error.status = 400;
                    throw error
                };
            });
            next();
        }catch(error){
            next(error)
        }
    }
}
module.exports = propertiesNotEmpty;