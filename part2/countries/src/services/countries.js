import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'
const api_key = import.meta.env.VITE_SOME_KEY
const baseWeatherUrl = 'http://api.weatherstack.com/'

export const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
}

export const getUniqueCountry = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`);
  return request.then(response => response.data);
}

export const getWeather = (capital) => {
  const request = axios.get(`${baseWeatherUrl}current?access_key=${api_key}&query=${capital}`);
  return request.then(response => {
    return response.data
  })
}



