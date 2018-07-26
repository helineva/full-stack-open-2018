import React from 'react';

const ShowNumbers = ({ persons, filter, removePerson }) => (
  <div>
    <h3>Numerot</h3>
    <table>
      <tbody>
        {persons
          .filter(person =>
            person.name.toLowerCase().includes(filter.toLowerCase()))
          .map(person =>
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button
                  name={person.name}
                  id={person.id}
                  onClick={removePerson}>
                  poista
                </button>
              </td>
            </tr>
        )}
      </tbody>
    </table>
  </div>
);

export default ShowNumbers;
