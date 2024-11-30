export function hasValidTableIdAndReservationId( tableId, reservation_id ) {   

    const errors = {};
    if ( !tableId ) {
            console.error("Validation error: Missing table ID");
            errors.missingTableId = "Validation error: Missing tableId.";
        };

    if ( !reservation_id ) {
            console.error("Validation error: Missing reservation ID.");
             errors.missingReservationId = "Validation error: Missing reservation_id."
    }

    return errors; 
}