
import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { listTables, updateToSeated } from "../utils/api";

function SeatReservation(){
    const {reservation_id} = useParams();
    const history = useHistory();
    const [tables, setTables] = useState([]);
    const [formData, setFormData] = useState(1);
    const [errors, setErrors] = useState({});
    //useState for formData
    //submit handler
    //Table number: `<select name="table_id" />`. The text of each option must be `{table.table_name} - {table.capacity}` so the tests can find the options.
    //PUT to `/tables/:table_id/seat/` in order to save the table assignment.
    //display a `Submit` button that, when clicked, assigns the table to the reservation then displays the `/dashboard` page
    //display a `Cancel` button that, when clicked, returns the user to the previous page
    useEffect(() => {
        const ac = new AbortController();
        listTables(ac.signal).then(setTables);
        return () => ac.abort();
      }, []);
    const mapErrors = Object.keys(errors).map((error, index) => (
        <div className="alert alert-danger" role="alert">{error}</div>
    ));

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateToSeated(formData.table_id, reservation_id);
            history.push("/")
        } catch (error) {
            if (!errors[error.message]) {
                setErrors({ ...errors, [error.message]: 1 })
            }
        }
    }

    return (
        <main>
            <div className="createErrors">{mapErrors ? mapErrors : null}</div>
            <h1>Seat Reservation {reservation_id}</h1>
            <div className="d-md-flex mb-3">
            <select name="table_id" className="form-control form-control-lg mb-3" onChange={handleChange}>
                {tables.map((table) => (
                    <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                    </option>
                ))}
        </select>
                    <div className="row">
                        <button className="btn btn-secondary mr-2">
                        <Link to="/" style={{color: 'white'}}>
                            Cancel
                        </Link>
                        </button>
                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
            </div>
        </main>
    );
}

export default SeatReservation;