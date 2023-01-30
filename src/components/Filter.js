const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      <h2>Search</h2>

      <p>Filter Name</p>
      <input type="text" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
