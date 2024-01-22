const Form = ({
  newName,
  newNum,
  handleSubmit,
  handleNameChange,
  handleNumChange,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">name </label>
          <input
            type="text"
            name="name"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div className="no">
          <label htmlFor="no">number </label>
          <input
            type="text"
            name="no"
            value={newNum}
            onChange={handleNumChange}
          />
        </div>
        <div className="btn">
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

export default Form;
