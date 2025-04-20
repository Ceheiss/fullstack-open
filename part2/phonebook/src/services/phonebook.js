import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';


const getPersons = () => {
  const request = axios.get(baseUrl)
    
  return request.then(response => {
    console.log("response", response);
    return response.data
  });
}



const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response =>  console.log("Person added correctly: ", response));
}


export default { 
  getPersons,
  createPerson
}