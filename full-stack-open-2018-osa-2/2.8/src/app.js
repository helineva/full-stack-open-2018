import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '040-123456'
        },
        { name: 'Esko Ukkonen',
          number: '09-546272'
        }
      ],
      newName: '',
      newNumber: ''
    }
  };

  addPerson = (event) => {
    event.preventDefault();
    if (!this.state.persons.some(person => person.name === this.state.newName)) {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber
      };
      const newPersons = this.state.persons.concat(newPerson);
      this.setState({
        persons: newPersons,
        newName: '',
        newNumber: ''
      });
    };
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  };
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
            />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
              />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(
          person => <div key={person.name}>{person.name} {person.number}</div>
        )}
      </div>
    )
  };
};

export default App;
