import axios from 'axios';
const baseUrl = '/api/persons'


const getPersons = () => {
  const request = axios.get(baseUrl)
    
  return request.then(response => {
    console.log("response", response);
    return response.data
  });
}



const createPerson = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(response =>  {
    console.log("Person added correctly: ", response.data)
    return response.data;
  });
}

const deletePerson = (personId) => {
  const request = axios.delete(`${baseUrl}/${personId}`);
  return request.then(response => {
    console.log("Person deleted correctly: ", response.data);
    return response.data;
  });
}

const updatePerson = (personId, newObject) => {
  const request = axios.put(`${baseUrl}/${personId}`, newObject);
  return request.then(response => response.data);
}

export default { 
  getPersons,
  createPerson,
  deletePerson,
  updatePerson
}