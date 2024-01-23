// reservations status badges
function getBadgeVariantReservation(status) {
  switch (status) {
    case "booked":
      return "badge-booked";
    case "seated":
      return "badge-seated";
    case "finished":
      return "badge-finished";
    case "cancelled":
      return "badge-cancelled";
    default:
      return "light";
  }
}

// tables status badges
function getTableStatusBadgeVariant(reservationId) {
  return reservationId ? "badge-seated" : "badge-booked";
}

function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
}

export { 
    getBadgeVariantReservation,
    getTableStatusBadgeVariant,
    formatPhoneNumber,
 };
