import React, { useState, useEffect } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { readReservation, updateReservation } from "../utils/api";
import { useHistory, useParams } from "react-router-dom";

export default function EditReservation() {
    const history = useHistory();

    const initialFormState = {
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time: "",
        people: 0,
    }

    const [formData, setFormData] = useState({...initialFormState});
    const [error, setError] = useState(null);
    const { reservation_id } = useParams();

    useEffect(() => {
        const ac = new AbortController();
        readReservation(reservation_id, ac.signal)
        .then((response) => {
            setFormData({
                ...response 
            })
        })
        .catch(setError);
    }, [reservation_id]);

    const changeHandler = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    function cancelHandler() {
        history.goBack();
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const ac = new AbortController();
            setError(null);
            await updateReservation({
                ...formData, people: Number(formData.people )
            }, ac.signal);
            history.push(`/dashboard?date=${formData.reservation_date}`);
            return () => ac.abort();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Edit Reservation</h1>
            <ErrorAlert error={error} />
            <form onSubmit={handleSubmit}>
                    <div className="row">
                    <div className="form-group col">
                        <label>First Name
                        <input name="first_name" type="text" className="form-control" required="" placeholder="First Name" value={formData.first_name} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Last Name
                        <input name="last_name" type="text" className="form-control" required="" placeholder="Last Name" value={formData.last_name} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Mobile Number
                        <input name="mobile_number" type="text" className="form-control" required="" placeholder="Mobile Number" value={formData.mobile_number} onChange={changeHandler}></input>
                        </label>
                    </div>
                    </div>
                    <div className="row">
                    <div className="form-group col">
                        <label>Date
                        <input name="reservation_date" type="date" className="form-control" required="" placeholder="yyyy-mm-dd" value={formData.reservation_date} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>Time
                        <input name="reservation_time" type="time" className="form-control" required="" placeholder="--:-- --" value={formData.reservation_time} onChange={changeHandler}></input>
                        </label>
                    </div>
                    <div className="form-group col">
                        <label>People
                        <input name="people" type="number" className="form-control" required="" value={formData.people} onChange={changeHandler}></input>
                        </label>
                    </div>
                    </div>
                    <button className="btn btn-secondary mr-2 cancel" type="button" onClick={cancelHandler}>Cancel</button>
                    <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}