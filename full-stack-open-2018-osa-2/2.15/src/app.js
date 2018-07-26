import React from 'react';
import Filter from './components/filter.js';
import FormAddPerson from './components/formaddperson.js';
import ShowNumbers from './components/shownumbers.js';
import personService from './services/persons.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  };

  componentDidMount() {
    personService
      .getAll()
      .then(response => this.setState({ persons: response.data}));
  }

  addPerson = (event) => {
    event.preventDefault();
    if (!this.state.persons.some(person => person.name === this.state.newName)) {
      const newPerson = {
        name: this.state.newName,
        number: this.state.newNumber
      };

      personService
        .create(newPerson)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: ''
          })
        });
    };
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value });
  };
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value });
  };
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Filter value={this.state.filter}
          handleFilterChange={this.handleFilterChange} />
        <FormAddPerson addPerson={this.addPerson}
          newName={this.state.newName}
          handleNameChange={this.handleNameChange}
          newNumber={this.state.newNumber}
          handleNumberChange={this.handleNumberChange} />
        <ShowNumbers persons={this.state.persons}
          filter={this.state.filter} />
      </div>
    )
  };
};

export default App;
