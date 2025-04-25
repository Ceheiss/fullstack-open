export const Results = ({countries, handleClick}) => {
  return countries.map(c => <li key={c}>{c} <button onClick={() => handleClick(c)}>Show</button></li>)
}
