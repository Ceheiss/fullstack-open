import { useState, useEffect } from 'react';
import { getAll, getUniqueCountry } from './services/countries';
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

  return (
    <div>
      <h1>Hello, Countries!</h1>
      find countries <input onChange={handleChange} value={searchedCountry}></input>
      <ul>{ countries.length > 1 && countries.length < 10 ?
            countries.map(c => <li key={c}>{c}</li>) : 
            countries.length === 1 && selectedCountry ? <>
              {console.log("adentro", selectedCountry)}
              <h1>{selectedCountry.name}</h1>
              <p>Capital {selectedCountry.capital}</p>
              <p>Area {selectedCountry.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(selectedCountry.languages)
                  .map(lang => <li key={lang}>{lang}</li>)}
              </ul>
              <img src={selectedCountry.flagSrc} alt={`Flag of ${selectedCountry.name}`} />
            </>:
            "Too many matches, specify anothe filter" }
      </ul>
    </div>
  )
}

export default App