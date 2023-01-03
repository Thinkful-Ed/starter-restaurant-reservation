import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, readReservation, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function TableSeating() {
    const [tables, setTables] = useState([]);
    const [tablesError, setTablesError] = useState(null);
    const { reservationId } = useParams();
    const [reservation, setReservation] = useState([]);
    const [reservationError, setReservationError] = useState(null);
    // const [formErrors, setFormErrors] = useState(null);
    const [options, setOptions] = useState([]);
    const history = useHistory();
    
    const [seatTableFormData, setSeatTableFormData] = useState({});


    useEffect(() => {
        async function loadReservation() {
            const abortController = new AbortController();
            try {
                const reservationFromAPI = await readReservation(reservationId,abortController.signal);
                setReservation(reservationFromAPI);
            } catch (error) {
                if (error) {
                    setReservationError(error)
                }
            }
            return () => abortController.abort();
        }
        async function loadTables() {
            const abortController = new AbortController();
            try {
                const tablesFromAPI = await listTables(abortController.signal);
                setTables(tablesFromAPI);
                const results = [];
                tablesFromAPI.forEach((table) => {
                    results.push({
                        key: `${table.table_name}-${table.capacity}`,
                        value: table.table_id
                    });
                });
                setOptions([
                    { key: `Select a table`, value: '' },
                    ...results
                ])
            } catch (error) {
                if (error) {
                    setTablesError(error)
                }
            }
            return () => abortController.abort();
        }

        loadTables();
        loadReservation();
    }, [reservationId]);

    const handleTableSeating = async (table) => {
        // const status = "seated";

        const abortController = new AbortController();
        try {
            // await updateReservationStatus(reservationId, status, abortController.signal);
            await updateTable(table.table_id, reservationId, abortController.signal);

            history.push(`/dashboard`);
        }
        catch (error) {
            if (error) {
                setTablesError(error);
            }
        }

        //} 
        return () => abortController.abort();
    };

    function validCapacity(table) {
        const people = reservation.people;
        const currentTable = tables.filter((item)=>table.id === item.id);
        const tableCapacity = currentTable[0].capacity;
        const errors = {};
        if (people > tableCapacity) {
            errors.capacity='Form: Too many people for this table';
        }
        
        return errors;
    }
    const handleTableSeatChange = ({ target }) => {
        setSeatTableFormData({
            ...seatTableFormData,
            [target.name]: target.value,
        });
    };
    const handleTableseatSubmit = (event) => {
        event.preventDefault();
        handleTableSeating(seatTableFormData);

    };

    const formValidation = (event) => {
        event.preventDefault();
        const capacityError = validCapacity(seatTableFormData);
                     // Clear all previous errors
  const errorElements = document.querySelectorAll(".errors");
  //   errorElements.classList.remove("alert");
  //   errorElements.classList.remove("alert-danger");
  
    for (let element of errorElements) {
      element.style.display = "none";
    }
     // Display any new errors
     if(Object.keys(capacityError).length !== 0){
      const errorDiv = document.querySelector(".errors");
      errorDiv.classList.add("alert");
      errorDiv.classList.add("alert-danger");
      Object.keys(capacityError).forEach((key) => {
          // Find the specific error element
          const errorElement = document.querySelector(`.errors`);
          errorElement.innerHTML = capacityError[key];
          errorElement.style.display = "block";
        });
     }
           

            else{
            handleTableseatSubmit(event);
        }
    }
    return (

        <div className="pt-3">
                                <div className="m-2 errors"></div>

            {tablesError &&
                <ErrorAlert error={tablesError} />
            }
            {reservationError &&
                <ErrorAlert error={reservationError} />
            }
            <form name="TableSeating" onSubmit={formValidation}>
                <table className="table table-bordered table-condensed table-striped">
                    <tbody>
                        <tr>
                            <th colSpan={"3"}>Seat a Reservation</th></tr>
                        <tr>
                            <td>
                                <label htmlFor="table_id">Choose a table:</label>

                                <select name="table_id" id="table_id" onChange={handleTableSeatChange}>
                                    {options.map((option) => {
                                        return (
                                            <option key={option.value} value={option.value}>{option.key}</option>
                                        )
                                    })}
                                </select>
</td>
                                <td><button type="submit" className="btn btn-primary mr-3">Submit</button>
                                    <button type="button" onClick={() => history.goBack()} className="btn btn-danger">Cancel</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default TableSeating;