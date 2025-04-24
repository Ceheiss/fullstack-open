import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'


export const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => response.data);
}

export const getUniqueCountry = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`);
  return request.then(response => response.data);
}