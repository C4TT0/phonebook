const Filter = ({ toFilter, handleFilter, filtered }) => {
  return (
    <>
      <div className="filter">
        <div className="form">
          <label htmlFor="search">filter shown with </label>
          <input type="text" value={toFilter} onChange={handleFilter} />
        </div>
        <div className="results">
          {filtered.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Filter;
