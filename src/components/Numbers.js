const Numbers = ({ people }) => {
  return (
    <div>
      <h2>Numbers</h2>

      {people.map((person) => (
        <p key={person.number}>
          {person.name} - {person.number}
        </p>
      ))}
    </div>
  );
};

export default Numbers;
