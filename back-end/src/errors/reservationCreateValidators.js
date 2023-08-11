const peopleValidator = (req, res, next) => {
    const { people } = req.body.data;
    if(!Number.isInteger(people)){
        next({
            status : 400,
            message : 'people is not a number'
        })
    } else {
        next()
    }
}

const isValidDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/

    return datePattern.test(date)
}

const dateValidator = (req, res, next) => {
    const { reservation_date } = req.body.data;
    if(isValidDate(reservation_date)){
        next();
    } else {
        next({
            status : 400,
            message : 'reservation_date need to be a date'
        })
    }
}

const isValidTime = (time) => {
    const timePattern = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

    return timePattern.test(time)
}

const timeValidator = (req, res, next) => {
    const { reservation_time } = req.body.data;
    if(isValidTime(reservation_time)){
        next();
    } else {
        next({
            status : 400,
            message : 'reservation_time should be a time formatted like hh-mm'
        })
    }
}

  module.exports = {
    peopleValidator,
    dateValidator,
    timeValidator
  }