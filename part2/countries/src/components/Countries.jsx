import Country from "./Country";

const Countries = ({ countries, setCountries, filter }) => {
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()),
  );

  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (filteredCountries.length > 1) {
    return (
      <ul>
        {filteredCountries.map((country) => (
          <li key={country.cca3}>
            {country.name.common}{" "}
            <button onClick={() => setCountries([country])}>show</button>
          </li>
        ))}
      </ul>
    );
  } else if (filteredCountries.length === 1) {
    return <Country country={filteredCountries[0]} />;
  } else {
    return <p>No matches</p>;
  }
};

export default Countries;
