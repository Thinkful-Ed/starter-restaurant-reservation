import { useState } from "react";
import { search } from "../utils/api";
import { formatAsTime } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [searchNumber, setSearchNumber] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFoundError, setNotFoundError] = useState(null);

  function changeHandler({ target: { value } }) {
    setSearchNumber(value);
  }

  async function submitHandler(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    setNotFoundError(null);
    const results = await search(searchNumber);
    if (!results.length) setNotFoundError({ message: "No reservations found" });
    setSearchResults(results);
  }

  let tableData;

  if (searchResults) {
    tableData = searchResults.map((result) => {
      return (
        <tr key={result.reservation_id}>
          <td>{result.reservation_id}</td>
          <td>{result.first_name}</td>
          <td>{result.last_name}</td>
          <td>{result.mobile_number}</td>
          <td>{formatAsTime(result.reservation_time)}</td>
          <td>{result.people}</td>
          <td>{result.status}</td>
        </tr>
      );
    });
  }

  let displaySearchResults = (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Mobile number</th>
          <th scope="col">Reservation time</th>
          <th scope="col">Party size</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>{tableData}</tbody>
    </table>
  );

  return (
    <div>
      <h1>Search here</h1>
      <div className="row">
        <form onSubmit={submitHandler} className="col-4">
          <label htmlFor="mobile_number">Mobile number</label>
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            className="form-control"
            value={searchNumber}
            required
            placeholder="Enter a phone number"
            onChange={changeHandler}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <ErrorAlert error={notFoundError} />
      {searchResults.length > 0 ? displaySearchResults : null}
    </div>
  );
}

export default Search;
