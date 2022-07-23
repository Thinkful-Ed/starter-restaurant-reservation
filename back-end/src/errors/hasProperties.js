

//  Creates a middleware function that validates that req.body.data has the specified non-falsey properties.

 function hasProperties(...properties) {
  return function (res, req, next) {
    const { data = {} } = res.body;

    errorMessages = []

    try {

      properties.forEach((property) => {
        const value = data[property];
        if (!value) {
          errorMessages.push(`A '${property}' field is required. `)
          // const error = new Error(`A '${property}' prop is required. `);
          // error.status = 400;
          // throw error;
        }

        if(property === "reservation_date" && value){
          const reservation_date = new Date(value)
          if(Number.isNaN(reservation_date.getTime())) {
              errorMessages.push(`The reservation date ${property} is not valid`)
          } else {
              console.log("date is valid")
          }
        }

        if(property === "reservation_time" && value){
          const reservation_time = new Date(`${data["reservation_date"]} ${value}`)
          if(Number.isNaN(reservation_time.getTime())) {
              errorMessages.push(`The reservation time ${property} is not valid`)
          } else {
              console.log("Time is valid")
          }
        }
        if(property === "people" && value){
          //the values are all of type string currently :(
            console.log("Type value: ", typeof value)
            console.log("value: ", value)
          if(typeof value !== "number"){
            errorMessages.push(`The people field should be a number. ${typeof value}`)
          }
          else if(typeof value === "number" && value <= 0){
            errorMessages.push("The people field requires at least one person")
          }
        }
      });

      if(errorMessages.length > 0){
        next({
          status:400,
          message: errorMessages.join('\n')
        })
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = hasProperties;
