import React from 'react';
import Kurssi from './components/kurssi.js';

const App = ({ kurssit }) => (
  <div>
    <h1>Opetusohjelma</h1>
    {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
  </div>
);

export default App;
