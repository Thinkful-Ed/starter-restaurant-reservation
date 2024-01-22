// reservations
function getBadgeVariantReservation(status) {
  switch (status) {
    case "booked":
      return "info";
    case "seated":
      return "success";
    case "finished":
      return "secondary";
    default:
      return "light";
  }
}

// tables
function getTableStatusBadgeVariant(reservationId) {
  return reservationId ? "info" : "success";
}

export { 
    getBadgeVariantReservation,
    getTableStatusBadgeVariant,
 };
