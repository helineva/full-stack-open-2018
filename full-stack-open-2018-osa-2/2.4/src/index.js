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
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
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
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
