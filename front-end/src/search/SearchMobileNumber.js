import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Defines the search form used in the search reservation page by mobile_number.
 * @returns {JSX.Element}
 */

function SearchMobileNumber() {
  const [mobile_number, setMobile_number] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setMobile_number(event.target.value);
    console.log(mobile_number);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?${mobile_number}`);
  };

  return (
    <div>
      <h1>Search for reservations by phone number</h1>
      <form>
        <label htmlFor="mobile_number">
          <input
            id="mobile_number"
            type="text"
            name="mobile_number"
            placeholder="Enter a customer’s phone number"
            onChange={handleChange}
            value={mobile_number}
          />
        </label>
        <button type="submit" onSubmit={handleSubmit}>
          Find
        </button>
      </form>
    </div>
  );
}

export default SearchMobileNumber;
