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
      .then(persons => this.setState({ persons: persons}));
  }

  addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    };
    let id = -1;
    this.state.persons.forEach(person =>
        person.name === newPerson.name ? id = person.id : 0);
    if (id === -1) {
      personService
        .create(newPerson)
        .then(person => {
          this.setState({
            persons: this.state.persons.concat(person),
            newName: '',
            newNumber: ''
          })
        });
    } else {
      if (window.confirm(`${newPerson.name} on jo luettelossa, korvataanko?`)) {
        personService
          .update(id, newPerson)
          .then(person => {
            const newPersons = [...this.state.persons];
            newPersons.forEach(p => p.id === person.id ? p.number = person.number : 0);
            this.setState({
              persons: newPersons,
              newName: '',
              newNumber: ''
            });
          });
      };
    };
  };

  removePerson = (event) => {
    const id = event.target.getAttribute("id");
    const name = event.target.getAttribute("name");
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id);
      this.setState({
        persons: this.state.persons.filter(person => person.id.toString() !== id)
      });
    };
  };

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
          filter={this.state.filter}
          removePerson={this.removePerson} />
      </div>
    )
  };
};

export default App;
