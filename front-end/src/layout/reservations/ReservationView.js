import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../ErrorAlert";

function ReservationView() {
  const history = useHistory();
  const { reservationId } = useParams();

  const [reservation, setReservation] = useState({});
    const [error, setError] = useState(null);
    
    useEffect()
}

export default ReservationView;
