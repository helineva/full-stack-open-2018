import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = ({ otsikko }) => (
  <h1>{otsikko}</h1>
);

const Osa = ({ osa }) => (
  <p>{osa.nimi} {osa.tehtavia}</p>
);

const Sisalto = ({ osat }) => (
  <div>
    {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
  </div>
);

const Yhteensa = ({ yhteensa }) => (
  <div>yhteensä {yhteensa} tehtävää</div>
);

const Kurssi = ({ kurssi }) => {
  let yhteensa = kurssi.osat.reduce((yht, osa) => yht + osa.tehtavia, 0);
  return (
    <div>
      <Otsikko otsikko={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa yhteensa={yhteensa} />
    </div>
  );
};

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      },
      {
        nimi: 'Redux',
        tehtavia: 7,
        id: 4
      }
    ]
  };
  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
