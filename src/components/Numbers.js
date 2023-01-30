const Numbers = ({ people, handleDelete }) => {
  return (
    <div>
      <h2>Numbers</h2>

      {people.map((person) => (
        <div key={person.id}>
          <span>
            {" "}
            {person.name} - {person.number}
          </span>

          <button
            onClick={() => {
              handleDelete(person.id);
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
