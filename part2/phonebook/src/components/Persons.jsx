export const Persons = ({filteredPersons}) => (
  filteredPersons.map(person => (
    <div key={person.name}>{person.name} {person.number}</div>
  ))
);