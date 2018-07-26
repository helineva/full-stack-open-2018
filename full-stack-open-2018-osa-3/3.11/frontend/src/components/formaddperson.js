import React from 'react';

const FormAddPerson = ({
    addPerson, newName, handleNameChange, newNumber, handleNumberChange
  }) => (
    <div>
      <h3>Lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          numero: <input
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
);

export default FormAddPerson;
