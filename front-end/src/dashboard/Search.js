import { findReservationByPhoneNumber } from "../utils/api";

const Search = () => {

  function listReservationsByPhoneNumber(e) {
    console.log(e.target.value);
    findReservationByPhoneNumber(e.target.value, signal)
  }
  return (
<div className="input-group">

	<input name="mobile_number" id="search-input" type="search" className="form-control" placeholder="Enter a customer's phone number"></input>
  	<button id="search-button" type="button" className="btn btn-primary" onClick={listReservationsByPhoneNumber}>
      Find
  	</button>
</div>
  );
};

export default Search;
