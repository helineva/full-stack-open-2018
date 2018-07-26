import React from 'react';

const ShowCountries = ({ countries, handleOnClick }) => {
  const n = countries.length;
  if (n === 0) {
    return (<div>no matches</div>);
  } else if (n === 1) {
    const c = countries[0];
    return (
      <div>
        <h2>{c.name} {c.nativeName}</h2>
        <div>capital: {c.capital}</div>
        <div>population: {c.population}</div>
        <img src={c.flag} alt="flag" width="200"/>
      </div>
    );
  } else if (n < 10) {
    return (
      <div>
        {countries.map(country =>
          <div key={country.name} onClick={handleOnClick}>
            {country.name}
          </div>)}
      </div>
    );
  }  else {
  return (<div>too many matches, specify another filter</div>);
  }
};

export default ShowCountries;
