import React from 'react';

const ShowNumbers = ({ persons, filter }) => (
  <div>
    <h3>Numerot</h3>
    {persons
      .filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person =>
        <div key={person.name}>{person.name} {person.number}</div>
    )}
  </div>
);

export default ShowNumbers;
