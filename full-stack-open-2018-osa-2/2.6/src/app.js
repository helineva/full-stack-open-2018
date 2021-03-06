import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  };

  addName = (event) => {
    event.preventDefault();
    const newPerson = { name: this.state.newName };
    const newPersons = this.state.persons.concat(newPerson);
    this.setState({
      persons: newPersons,
      newName: ''
    });
  }

  handleChange = (event) => {
    this.setState({ newName: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        {this.state.persons.map(person => <div key={person.name}>{person.name}</div>)}
      </div>
    )
  };
};

export default App;
