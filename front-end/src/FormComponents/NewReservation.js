import React from 'react';
import Form from './Form';
import { createReservation } from '../utils/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const NewReservation = ({setReservations, reservations}) => {
    const history = useHistory()
    const initialFormData = {
        first_name : '',
        last_name : '',
        mobile_number : '',
        reservation_date : '',
        reservation_time : '',
        people : null
    }

    const submitHandler = (formData) => {
        createReservation(formData)
            .then(data => console.log(data))
            .then(history.push('/'))
            .catch(error => console.log("this is the error given",error.message))
    }
    return (
        <section>
            <Form 
                headerText="Create New Reservation"
                initialFormData={initialFormData}
                submitHandler={submitHandler}
            />
        </section>
    )
}

export default NewReservation;