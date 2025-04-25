import { useState, useEffect } from 'react';
import { getAll, getUniqueCountry, getWeather } from './services/countries';
import { CountryDetails } from './components/CountryDetails';
import { Results } from './components/Results';
import './index.css';



const App = () => {
  const [initialData, setInitialData] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const fetchAndSetCountryData = (country) => {
    getUniqueCountry(country)
    .then((data) => {
      setSelectedCountry({
        name: data.name.common,
        capital: data.capital[0],
        area: data.area,
        languages: data.languages,
        flagSrc: data.flags.png 
      });
      return data.capital[0]
    })
    .then((capital) => {
      return getWeather(capital)
    })
    .then((weatherData) => {
      setWeather({
        temperature: weatherData.current.temperature,
        weatherIconUrl: weatherData.current.weather_icons[0],
        windSpeed: weatherData.current.wind_speed
      })
    })
    .catch(err => {
      console.error("Error getting country specific data: ", err)
    })
  }

  useEffect(() => {
    getAll()
      .then((data) => {
        setInitialData(data)
      })
      .catch(err => {
        console.error("Couldn't fetch the countries: ", err)
      })
  }, []);

  useEffect(() => {
    const filteredCountries = initialData.map(c => c.name.common.toLowerCase()).filter(c => c.includes(searchedCountry.toLowerCase()));
    setCountries(filteredCountries);
    // So the last selected country doesn't show
    if (filteredCountries.length > 10) {
      setSelectedCountry(null)
      setWeather(null)
    }
    if (filteredCountries.length === 1 ) {
      fetchAndSetCountryData(filteredCountries[0])
    }
  }, [searchedCountry]);

  const handleChange = (event) => {
    setSearchedCountry(event.target.value);
  };

  const handleClick = (country) => {
    fetchAndSetCountryData(country)
  }

  return (
    <div>
      find countries <input onChange={handleChange} value={searchedCountry}></input>
      { countries.length > 1 && countries.length <= 10 ?
            <ul>
              <Results countries={countries} handleClick={handleClick}/>
            </ul> : 
            countries.length === 1 && selectedCountry && weather ?
              <CountryDetails 
                name={selectedCountry.name}
                capital={selectedCountry.capital} 
                area={selectedCountry.area} 
                languages={selectedCountry.languages} 
                flagSrc={selectedCountry.flagSrc}
                temperature={weather.temperature}
                weatherIconUrl={weather.weatherIconUrl}
                windSpeed={weather.windSpeed}
              /> 
             : countries.length > 10 && searchedCountry.length >= 1 ?
            <p>Too many matches, specify another filter</p>
            : null }
      {selectedCountry && weather && countries.length !== 1 && 
        <CountryDetails 
          name={selectedCountry.name}
          capital={selectedCountry.capital} 
          area={selectedCountry.area} 
          languages={selectedCountry.languages} 
          flagSrc={selectedCountry.flagSrc} 
          temperature={weather.temperature}
          weatherIconUrl={weather.weatherIconUrl}
          windSpeed={weather.windSpeed}
        />
      }
    </div>
  )
}

export default App