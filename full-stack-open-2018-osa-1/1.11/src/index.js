import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = ({otsikko}) => ( <h1>{otsikko}</h1> );

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const Statistics = ({arvioita, hyva, neutraali, huono, ka, po}) => {
  if (arvioita === 0) {
    return (<div>ei yhtään palautetta annettu</div>);
  } else return (
    <table>
      <tbody>
        <Statistic text={'hyvä'} value={hyva} />
        <Statistic text={'neutraali'} value={neutraali} />
        <Statistic text={'huono'} value={huono} />
        <Statistic text={'keskiarvo'} value={ka.toFixed(1)} />
        <Statistic text={'positiivisia'} value={po.toFixed(1) + ' %'} />
      </tbody>
    </table>
  );
};

const Statistic = ({text, value}) => (<tr><td>{text}</td><td>{value}</td></tr>);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    };
  }

  lisaaArvio = (kategoria) => () =>
    this.setState({ [kategoria]: this.state[kategoria] + 1 });

  arvioita = () => (this.state.hyva + this.state.neutraali + this.state.huono);
  laskeKeskiarvo = () => (this.state.hyva - this.state.huono) / this.arvioita();
  laskePosOsuus = () => this.state.hyva / this.arvioita() * 100;

  render() {
    return (
      <div>
        <Otsikko otsikko={'anna palautetta'} />
        <Button handleClick={this.lisaaArvio('hyva')} text={'hyvä'} />
        <Button handleClick={this.lisaaArvio('neutraali')} text={'neutraali'} />
        <Button handleClick={this.lisaaArvio('huono')} text={'huono'} />
        <Otsikko otsikko={'statistiikka'} />
        <Statistics
          arvioita={this.arvioita()}
          hyva={this.state.hyva}
          neutraali={this.state.neutraali}
          huono={this.state.huono}
          ka={this.laskeKeskiarvo()}
          po={this.laskePosOsuus()}
         />
      </div>
    );
  }
};

ReactDOM.render(<App />,  document.getElementById('root'))
