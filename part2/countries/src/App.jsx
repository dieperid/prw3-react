import { useState } from "react";
import Countries from "./components/Countries.jsx";
import Filter from "./components/Filter";
import { useEffect } from "react";
import countryService from "./services/countries.js";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={filter}
        setCountries={setCountries}
      />
    </div>
  );
};

export default App;
