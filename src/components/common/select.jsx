import React from "react";

const Select = ({ name, label, onChange, value, error, genres }) => {
  return (
    <div className="form-group">
      <label htmlFor="{name}">{label}</label>
      <select
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      >
        {genres.map(genre => (
          <option key={genre._id} value={genre._id}>
            {genre.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
