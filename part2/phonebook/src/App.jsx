import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '99-33-44' }
  ]) 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleInputNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleInputNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const isRepeated = Boolean(persons.find(person => person.name == newName));
    console.log(isRepeated)
    !isRepeated ?
      setPersons([...persons, { name: newName, number: newNumber }])
    :
      alert(`${newName} is already added to phonebook`)
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleInputNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleInputNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => (
        <div key={person.name}>{person.name} {person.number}</div>
        ))}
    </div>
  )
}

export default App