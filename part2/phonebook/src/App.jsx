import { useState, useEffect } from 'react'
import axios from 'axios';
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log("response", response);
        setPersons(response.data);
      })
  },[])

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputFilterChange = (event) => {
    setFilteredName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isRepeated = Boolean(persons.find(person => person.name == newName));
    const newPerson = { name: newName, number: newNumber };
    if (!isRepeated) {
      setPersons([...persons, newPerson]);
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response =>  console.log("Person added correctly: ", response));
    } else {
      alert(`${newName} is already added to phonebook`);
    }
    setNewName('');
    setNewNumber('');
  }

  const filteredPersons = persons.filter(person => person.name.toUpperCase().includes(filteredName.toUpperCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filteredName} onChange={handleInputFilterChange} />
      <PersonForm 
        nameInputValue={newName}
        onNameChange={handleInputNameChange} 
        numberInputValue={newNumber}
        onNumberChange={handleInputNumberChange}
        onSubmit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App