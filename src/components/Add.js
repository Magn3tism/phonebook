const Add = (props) => {
  const { name, number, handleNameChange, handleNumberChange, handleSubmit } =
    props;

  return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Name: <input type="text" value={name} onChange={handleNameChange} />
        </div>
        <div>
          Number:{" "}
          <input type="text" value={number} onChange={handleNumberChange} />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
};

export default Add;
