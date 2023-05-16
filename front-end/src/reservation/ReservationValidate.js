export function hasValidDateAndTime(reservation) {
    const date = reservation.reservation_date;
    const time = reservation.reservation_time;
    const errors = [];
  
    // No reservations on Tuesdays
    const day = new Date(date).getUTCDay();
    if (day === 2) {
      errors.push(new Error("Restaurant is closed on Tuesdays"));
    }
  
    // No reservations in the past
    const formattedDate = new Date(`${date}T${time}`);
    if (formattedDate <= new Date()) {
      errors.push(new Error("Reservation must be in the future"));
    }
  
    // No reservations before 10:30AM or after 9:30PM
    const hours = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);
    if (hours < 10 || (hours === 10 && minutes < 30)) {
      errors.push(new Error("Reservation must be after 10:30AM"));
    }
    if (hours > 21 || (hours === 21 && minutes > 30)) {
      errors.push(new Error("Reservation must be before 9:30PM"));
    }
  
    return errors;
  }