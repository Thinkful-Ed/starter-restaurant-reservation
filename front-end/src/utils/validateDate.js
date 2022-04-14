import {today} from "./date-time"

export function isDateTuesday(date) {
    const userReservationDate = new Date(date)
    if (userReservationDate.getUTCDay() === 2) {
        return "Restaurant is closed Tuesday. Please select another day."
    } else {
        return
    }
}

export function isDateInPast(date) {
    const userReservationDate = new Date(date)
    if(new Date() > userReservationDate) {
        return "Date cannot be in the past. Please select another date."
    } else {
        return
    }
}