import React from 'react';

const Filter = ({ value, handleFilterChange }) => (
  <div>rajaa näytettäviä
    <input value={value}
      onChange={handleFilterChange}/>
  </div>
);

export default Filter;
