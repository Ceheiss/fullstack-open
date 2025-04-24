import { useState, useEffect } from 'react';
import { getAll, getUniqueCountry } from './services/countries';
import './index.css';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    getAll()
      .then((data) => {
        const filteredCountries = data.map(c => c.name.common.toLowerCase()).filter(c => c.includes(searchedCountry.toLowerCase()));
        setCountries(filteredCountries);
        console.log("countries", countries);
      });
    if (countries.length === 1) {
      console.log("uno ctm", countries[0]);
      getUniqueCountry(countries[0])
        .then((data) => {
          setSelectedCountry({
            name: data.name.common,
            capital: data.capital[0],
            area: data.area,
            languages: data.languages,
            flagSrc: data.flags.png 
          });
        });
      console.log("selectedCountry: ", selectedCountry)
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
            countries.length === 1 ? <h1>{countries[0]}</h1> :
            "Too many matches, specify anothe filter" }
      </ul>
    </div>
  )
}

export default App