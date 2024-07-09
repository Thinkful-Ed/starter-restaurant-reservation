import { useState, useEffect } from "react";
import { listReservations, readReservation } from "../utils/api";

function useReservations({ date, reservationId = null }) {
  const [reservations, setReservations] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [reservationsError, setReservationsError] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    
    setReservations([]);
    setIsLoadingReservations(true);
    setReservationsError([]);

    async function loadReservations() {
      try {
        let response;
        if (reservationId) {
          response = await readReservation(reservationId, abortController.signal);
          setReservations([response]); //readReservation returns a single reservation object, so will be at reservations[0]
        } else {
          response = await listReservations({ date }, abortController.signal);
          setReservations(response);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
        setReservationsError([errorMessage]);
      } finally {
        setIsLoadingReservations(false);
      }
    }

    loadReservations();

    return () => { abortController.abort(); };

  }, [date, reservationId]); // Dependency array includes both date and reservationId

  return { reservations, setReservations, isLoadingReservations, reservationsError };
}

export default useReservations;

