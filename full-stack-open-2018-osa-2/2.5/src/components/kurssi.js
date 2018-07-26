import React from 'react';

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

export default Kurssi;
