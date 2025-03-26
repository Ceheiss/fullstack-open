import { useState } from 'react'
import { PersonForm } from './components/PersonForm';
import { Filter } from './components/Filter';
import { Persons } from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('');
  const [filteredName, setFilteredName] = useState('');
  const [newNumber, setNewNumber] = useState('');

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
    !isRepeated ?
      setPersons([...persons, { name: newName, number: newNumber }])
    :
      alert(`${newName} is already added to phonebook`)
    setNewName('')
    setNewNumber('')
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