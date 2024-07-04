import { useState, useEffect } from "react";
import { listReservations } from "../utils/api";

function useReservations(date) {
  const [reservations, setReservations] = useState([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [errorReservations, setErrorReservations] = useState([]);

  useEffect(() => {

    const abortController = new AbortController();
    setIsLoadingReservations(true);
    setErrorReservations([]);

    async function loadReservations() {
      try {
        const reservationsList = await listReservations({ date }, abortController.signal);
        setReservations(reservationsList);
      } catch (error) {
        const errorMessage = error.response?.data?.error || error.message || "Unknown error occurred.";
        setErrorReservations([errorMessage]);
      } finally {
        setIsLoadingReservations(false);
      }
    }

    loadReservations();

    return () => { abortController.abort();};

  }, [date]);

  return { reservations, isLoadingReservations, errorReservations };
}

export default useReservations;
