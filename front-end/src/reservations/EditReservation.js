import { useState } from "react";
import { useParams } from "react-router";
import { readReservation } from "../utils/api";
import { useEffect } from "react";
import ReservationForm from "./ReservationForm";
import { useHistory } from "react-router";
import { editReservation } from "../utils/api";


export default function EditReservation(){
    const { reservation_id } = useParams();
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

const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`submittttttteeeedddd`)

    // updateTheReservation()
    const updatedReservation = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        people: Number(formData.people),
    }
    console.log(formData.reservation_time)
        const abortController = new AbortController();
        try{
            await editReservation(reservation_id, updatedReservation, abortController.signal);
            // readReservation(reservation_id)
            // setFormData(formData)
            history.push(`/dashboard?date=${updatedReservation.reservation_date}`)
        }
        catch(error) {
            console.log(error);
            setCurrentReservationError(error.message);
            // throw error
        
    }
    return () => abortController.abort;




    // const abortController = new AbortController();
    // editReservation(reservation_id, updatedReservation, abortController.signal)
    //     .then(setFormData(formData))
    //     // .then(() =>
    //     // history.push(`/dashboard?date=${formData.reservation_date}`)
    //     // )
    //     .then(readReservation(reservation_id))
    //     .then(() => history.goBack())
    //     .catch((error) => setCurrentReservationError(error))
} 
const [updateError, setUpdateErorr] = useState();

async function updateTheReservation() {
    const updatedReservation = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        mobile_number: formData.mobile_number,
        reservation_date: formData.reservation_date,
        reservation_time: formData.reservation_time,
        people: Number(formData.people),
    }
    console.log(`heeeeeeeeerrrrrreeeeee`)
    editReservation(reservation_id, updatedReservation)
    .then(() => history.push('/dashboard'))
    .catch(setUpdateErorr)
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