import { useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import { useEffect } from "react";
import NewReservation from "./NewReservation";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";


export default function EditReservation(){
    const { reservation_id } = useParams();
    // const [currentReservation, setCurrentReservation] = useState();
    const [currentReservationError, setCurrentReservationError] = useState(null);
    
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: "",
    }
    const [formData, setFormData] = useState(initialFormState);

//TODO delete excess code
    // function loadReservation() {
    //     const abortController = new AbortController();
    //     readReservation(reservation_id, abortController.signal)
    //         .then(setFormData)
    //         .catch(setCurrentReservationError);
    //     return () => abortController.abort();
    // }
    // useEffect(loadReservation, [reservation_id]);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadReservation(){
            await readReservation(reservation_id, abortController.signal)
            .then(setFormData)
            .catch(setCurrentReservationError)     
        }
        loadReservation();
        return function cleanup() {
            abortController.abort();
        }
    }, [reservation_id])




const goBack = (event) => {
    event.preventDefault();
    history.goBack();
}

const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`submittttttteeeedddd`)
}

const handleChange = ({ target }) => {
    setFormData({...formData, [target.name]:target.value});
};

    return (
        <>
        <h4>Edit Reservation {reservation_id}</h4>
        <ReservationForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        goBack={goBack}
        />
        </>
    )
}