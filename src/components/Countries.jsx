import { useEffect, useState } from "react";
import Country from "./Country";
import Header from "./Header";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [loading, setLoading] = useState(true); // Loading state
  const [filteredCountries, setFilteredCountries] = useState([]); // Filtered countries
  const [searchTerm, setSearchTerm] = useState(""); // Search term

  // Fetch countries data from API
  useEffect(() => {
    try {
      const fetchCountries = async () => {
        const fetchData = await fetch(`https://restcountries.com/v3.1/all`);
        const data = await fetchData.json();
        setCountries(data);
        setFilteredCountries(data); // Initialize the filtered list
      };
      fetchCountries();
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  // Handle Search Term change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter countries based on search term
    const filtered = countries.filter((country) =>
      country?.name?.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountryDetails = (country) => {
    const countryCurrencies = Object.entries(country?.currencies || {}).map(
      (currency) => {
        const [code, { name, symbol }] = currency;
        return { code, name, symbol };
      }
    );

    setCountry({
      ...country,
      flag: country?.flags?.svg,
      population: country?.population?.toLocaleString(),
      currencies: countryCurrencies,
    });

    setIsModalOpen(true); // Open the modal
  };

  const closeModal = (e) => {
    setIsModalOpen(false); // Close the modal
  };

  const filteredData = ({ region, name: { common } }) => {
    if (
      region === "Europe" ||
      region === "Americas" ||
      common === "Israel" ||
      common === "India"
    ) {
      return false;
    }
    return true;
  };

  return (
    <>
      <div>
        <Header
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />
        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center items-center h-screen">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-800 h-32 w-32"></div>
          </div>
        )}
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-90 flex justify-center items-center z-50"
            onClick={closeModal}
          >
            <div
              className="bg-gray-200 p-5 pl-14 rounded-lg max-w-xl h-1/2 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{country?.name?.common}</h2>
                <button
                  className="text-gray-500 hover:text-gray-800 bg-red-300 w-10 h-10 rounded-full"
                  onClick={closeModal}
                >
                  X
                </button>
              </div>
              <div className="mt-4 space-y-2">
                <img className="w-1/2" src={country?.flag} alt="Country flag" />
                <p>
                  <strong>Population:</strong> {country?.population}
                </p>
                <p>
                  <strong>Region:</strong> {country?.region}
                </p>
                <p>
                  <strong>Capital:</strong>{" "}
                  {country?.capital
                    ? country?.capital
                    : "Capital not available"}
                </p>
              </div>
              {/* Display currencies dynamically */}
              <div className="mt-1 flex gap-1">
                <strong>Currencies:</strong>
                <ul>
                  {country?.currencies?.length > 0 ? (
                    country?.currencies?.map(({ code, name, symbol }) => (
                      <li key={code}>
                        {name} ({symbol}) - {code}
                      </li>
                    ))
                  ) : (
                    <p>Currencies not available</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Country List */}
        <div className="grid grid-cols-6 gap-6 px-4 my-44">
          {filteredCountries.length > 0 ? (
            filteredCountries
              .filter(filteredData)
              .sort((a, b) => {
                return a.name.common.localeCompare(b.name.common);
              })
              .map((country) => (
                <Country
                  key={country.cca3}
                  country={country}
                  handleCountryDetails={handleCountryDetails}
                />
              ))
          ) : (
            <div className="text-2xl text-red-400 w-full">
              <p>No countries found...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Countries;
