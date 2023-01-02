import React, {useState} from "react";
import ReservationsList from "../reservations/ReservationsList";
import { reservationSearch } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function Search(){

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [searchFormData, setSearchFormData] = useState({});
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    try {
        const reservationsFromAPI = await reservationSearch({ mobile_number:searchFormData.mobile_number }, abortController.signal);
        setReservations(reservationsFromAPI);
        setSearchPerformed(true);
    }
    catch (error) {
        if (error) {
          setReservationsError(error);
        }
    }

    //} 
    return () => abortController.abort();
};
  

const handleSearchChange = ({ target }) => {
  setSearchFormData({
      ...searchFormData,
      [target.name]: target.value,
  });
};
    return(
        <main>
          {reservationsError &&
                <ErrorAlert error={reservationsError} />
            }
      <div className="d-md-flex mb-3 pt-3">
      <form name="Tables" onSubmit={handleSearch}>
                <table className="table table-bordered table-condensed table-striped">
<tbody>
<tr><th>Search for a Reservation</th></tr>
<tr>
<td>
        <input name="mobile_number"
              type="text"
              size="30"
              placeholder="Enter a customer's phone number"
              onChange={handleSearchChange} 
              value={searchFormData.mobile_number} required/>
              <button type="submit"  className="btn btn-primary m-3">Find</button>
              </td>
              </tr>
                    </tbody>
                </table>
            </form>
      </div>
     {searchPerformed ? <div><div className="d-md-flex mb-3">
        <h4>Search Results</h4>
        </div>
        <div className="d-md-flex mb-3">
        {reservations.length > 0 ? <ReservationsList reservations={reservations} /> : <p>No reservations found.</p>}
        </div></div> : ""} 

    </main>
  );
    
}
export default Search;