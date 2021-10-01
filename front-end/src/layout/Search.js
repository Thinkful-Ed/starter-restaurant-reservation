import React from 'react';

export default function Search() {
  const [number, setNumber] = React.useState();
  const findHandler = () => {
    console.log("finding...")
  }
  
  const handleChange = ({ target }) => {
    setNumber({
      ...number,
      [target.name]: target.value,
    })
    console.log("form data changed")
  }
  console.log(number)

  return (
    <div>
      <label>
        Search:
        <br />
        <input
          type='search'
          name="mobile_number"
          placeholder="Enter a customers phone number"
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={() => findHandler()}>Find</button>
    </div>
  ) 
}