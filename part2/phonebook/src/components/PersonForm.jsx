export const PersonForm = ({
  nameInputValue,
  onNameChange,
  numberInputValue,
  onNumberChange,
  onSubmit}) => (
  <form onSubmit={onSubmit}>
    <h2>add new</h2>
    <div>
      name: <input value={nameInputValue} onChange={onNameChange} />
    </div>
    <div>
      number: <input value={numberInputValue} onChange={onNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
