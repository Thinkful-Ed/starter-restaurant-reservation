import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SearchMobileNumber() {
  const [mobile_number, setMobile_number] = useState("");
  const history = useHistory();

  const handleChange = (event) => {
    setMobile_number(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push(`/search?${mobile_number}`);
  };

  return (
    <div>
      <h1>Search for reservations by phone number</h1>
      <form>
        <div className="form-group">
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
          <div></div>
          <button
            className="btn btn-primary"
            type="submit"
            onSubmit={handleSubmit}
          >
            Find
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchMobileNumber;
