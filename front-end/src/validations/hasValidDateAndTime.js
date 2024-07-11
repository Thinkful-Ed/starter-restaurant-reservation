export function hasValidDateAndTime(reservation) {
   const date = reservation.reservation_date;
   const time = reservation.reservation_time;
   const errorMessages = [];
   console.log("date: ", date);
   console.log("time: ", time);
   
   // No reservations on Tuesdays
   const day = new Date(date).getUTCDay();
   if (day === 2) {
       errorMessages.push("Restaurant is closed on Tuesdays.");
   }
   
   // No reservations in the past
   const formattedDate = new Date(`${date}T${time}`);
   console.log("formattedDate", formattedDate);
   console.log("new Date()", new Date());
   if (formattedDate <= new Date()) {
       errorMessages.push("Reservation must be in the future.");
   }
   
   // No reservations before 10:30AM or after 9:30PM
   const hours = Number(time.split(":")[0]);
   const minutes = Number(time.split(":")[1]);
   if (hours < 10 || (hours === 10 && minutes < 30)) {
       errorMessages.push("Reservation must be after 10:30AM.");
   }
   if (hours > 21 || (hours === 21 && minutes > 30)) {
       errorMessages.push("Reservation must be before 9:30PM.");
   }
   
   // Aggregate error messages into a single object
   if (errorMessages.length > 0) {
       return { message: errorMessages.join(" ") }; // Joins messages with a space
   }
   return null; // No errors
}
