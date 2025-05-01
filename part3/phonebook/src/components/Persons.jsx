export const Persons = ({filteredPersons, handleDelete}) => (
  filteredPersons.map(person => (
    <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>  
  ))
)