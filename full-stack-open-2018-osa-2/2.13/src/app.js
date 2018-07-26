import React from 'react';
import axios from 'axios';
import ShowCountries from './components/showcountries.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filter: ''
    };
  };

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all'
        + '?fields=name;nativeName;capital;population;flag')
      .then(response => this.setState({ countries: response.data }));
  };

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value });
  };

  handleOnClick = (event) => {
    this.setState({ filter: event.target.textContent });
  };

  render() {
    const results = this.state.countries
      .filter(country => country.name.toLowerCase().includes(this.state.filter.toLowerCase()));
    return (
      <div>
        <h1>Information on countries</h1>
        <div>
          find countries:
          <input value={this.state.filter}
            onChange={this.handleFilterChange} />
        </div>
        <ShowCountries countries={results} handleOnClick={this.handleOnClick} />
      </div>
    )
  }
};

export default App;
