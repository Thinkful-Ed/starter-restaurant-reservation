import { useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import { useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";
import { editReservation } from "../utils/api";
import ValidateReservation from "./ValidateReservation";


export default function EditReservation(){
    const { reservation_id } = useParams();
    const [currentReservationError, setCurrentReservationError] = useState(null);
    const [errorDiv, setErrorDiv] = useState();
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

const [updateError, setUpdateError] = useState();

const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedReservation = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        people: Number(formData.people),
    }

    setErrorDiv(ValidateReservation(updatedReservation));
    
    if(ValidateReservation(updatedReservation).props.className !== "error alert alert-danger"){
    const abortController = new AbortController();
    try{
        await editReservation(reservation_id, updatedReservation, abortController.signal);
        history.push(`/dashboard?date=${updatedReservation.reservation_date}`)
    }
    catch(error) {
        console.log(error);
        setUpdateError(error.message);
        
    }
    return () => abortController.abort;
    } 
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
            <div>{!errorDiv ? '' : errorDiv}</div>
        </>
    )
}