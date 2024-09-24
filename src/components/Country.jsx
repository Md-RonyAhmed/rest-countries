/* eslint-disable react/prop-types */

import { useState } from "react";

const Country = ({ country, handleCountryDetails}) => {
  const [toggles, setToggles] = useState(false); // Toggle state to manage button label
   // Handle toggle state and country details in one function
   const handleButtonClick = () => {
    setToggles(!toggles); // Toggle the button state
    handleCountryDetails(country); // Call the country details handler
  };

  return (
    <div className="border bg-gray-200 p-5 shadow-lg rounded-lg hover:bg-gray-300 w-full h-80">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4">
          <h1 className="text-xl font-bold">{country?.name?.common}</h1>
          <button onClick={() => handleCountryDetails(country)}>
            <img
              className="w-fit h-32"
              src={country?.flags?.svg}
              alt={country?.flags?.alt}
            />
          </button>
          <h2>
            <span className="font-semibold">Capital: </span>
            { country?.capital ? country?.capital : "Capital not available"}
          </h2>
        </div>
        <div>
          <button
            className={`${toggles ? "bg-red-300 cursor-not-allowed":"bg-green-300 hover:bg-green-400" } px-4 py-2 rounded-lg  w-full font-semibold`} disabled = {toggles}
            onClick={handleButtonClick}
          >
            {toggles ? "Visited": "Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Country;
