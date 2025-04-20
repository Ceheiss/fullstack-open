import { useState, useEffect } from 'react';
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';
import phonebookService from './services/phonebook';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    phonebookService
      .getPersons()
      .then(response => setPersons(response))
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
    const person = persons.find(person => person.name == newName);
    const isRepeated = Boolean(person);
    const id = persons.length + newName.split("")[0] + Date.now();
    const newPerson = { name: newName, number: newNumber, id };
    if (!isRepeated) {
      setPersons([...persons, newPerson]);
      phonebookService.createPerson(newPerson);
    } else {
      if (window.confirm(`${newName} is already in your phonebook, do you want to replace the old number with the new one?`)) {
        const filteredPersons = persons.map((p) => {
          if (p.name === newName) {
            return {...p, number: newNumber}
          }
          return p;
        });
        setPersons(filteredPersons);
        phonebookService.updatePerson(person.id, newPerson);
      }
    }
    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (person) => { 
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      phonebookService.deletePerson(person.id);
      const afterDeletion = persons.filter((p) => p.id !== person.id);
      setPersons(afterDeletion);
    } else {
      alert("Person not deleted!")
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App