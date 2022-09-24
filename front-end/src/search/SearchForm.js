import React, { useState } from "react";
import formatPhoneNumber from "../utils/formatPhoneNumber";

export default function SearchForm() {
  const [mobileNumber, setMobileNumber] = useState("");

const handleChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setMobileNumber(formattedPhoneNumber);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="mobile_number">Mobile Number:</label>
          <input
            name="mobile_number"
            type="text"
            id="mobile_number"
            placeholder="Enter a customer's phone number"
            required={true}
            value={mobileNumber}
            onChange={handleChange}
          />
        </div>
      </form>
    </div>
  );
}
