import { useState, useEffect } from 'react';
import { getAll, getUniqueCountry } from './services/countries';
import { CountryDetails } from './components/CountryDetails';
import { Results } from './components/Results';
import './index.css';


const App = () => {
  const [initialData, setInitialData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getAll()
      .then((data) => {
        setInitialData(data)
      });
  }, []);

  useEffect(() => {
    const filteredCountries = initialData.map(c => c.name.common.toLowerCase()).filter(c => c.includes(searchedCountry.toLowerCase()));
    setCountries(filteredCountries);
    // So the last selected country doesn't show
    if (filteredCountries.length > 10) {
      setSelectedCountry(null)
    }
    if (filteredCountries.length === 1) {
      getUniqueCountry(filteredCountries[0])
        .then((data) => {
          setSelectedCountry({
            name: data.name.common,
            capital: data.capital[0],
            area: data.area,
            languages: data.languages,
            flagSrc: data.flags.png 
          });
        });
    }
  }, [searchedCountry]);

  const handleChange = (event) => {
    setSearchedCountry(event.target.value);
  };

  const handleClick = (country) => {
    getUniqueCountry(country)
        .then((data) => {
          setSelectedCountry({
            name: data.name.common,
            capital: data.capital[0],
            area: data.area,
            languages: data.languages,
            flagSrc: data.flags.png 
          });
        });
  }

  return (
    <div>
      find countries <input onChange={handleChange} value={searchedCountry}></input>
      { countries.length > 1 && countries.length <= 10 ?
            <ul>
              <Results countries={countries} handleClick={handleClick}/>
            </ul> : 
            countries.length === 1 && selectedCountry ?
              <CountryDetails 
                name={selectedCountry.name}
                capital={selectedCountry.capital} 
                area={selectedCountry.area} 
                languages={selectedCountry.languages} 
                flagSrc={selectedCountry.flagSrc} 
              /> 
             : countries.length > 10 && searchedCountry.length >= 1 ?
            <p>Too many matches, specify another filter</p>
            : null }
      {selectedCountry && countries.length !== 1 && 
        <CountryDetails 
          name={selectedCountry.name}
          capital={selectedCountry.capital} 
          area={selectedCountry.area} 
          languages={selectedCountry.languages} 
          flagSrc={selectedCountry.flagSrc} 
        />
      }
    </div>
  )
}

export default App