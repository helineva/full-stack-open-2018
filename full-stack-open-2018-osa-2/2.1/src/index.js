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

const Kurssi = ({ kurssi }) => (
  <div>
    <Otsikko otsikko={kurssi.nimi} />
    <Sisalto osat={kurssi.osat} />
  </div>
);

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
