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
    <div>
      <Statistic text={'hyvä'} value={hyva} />
      <Statistic text={'neutraali'} value={neutraali} />
      <Statistic text={'huono'} value={huono} />
      <Statistic text={'keskiarvo'} value={ka.toFixed(1)} />
      <Statistic text={'positiivisia'} value={po.toFixed(1) + ' %'} />
    </div>
  );
};

const Statistic = ({text, value}) => ( <div>{text} {value}</div> );

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hyva: 0,
      neutraali: 0,
      huono: 0
    };
  }

  lisaaHyva = () => this.setState({ hyva: this.state.hyva + 1 });
  lisaaNeutraali = () => this.setState({ neutraali: this.state.neutraali + 1 });
  lisaaHuono = () => this.setState({ huono: this.state.huono + 1 });

  arvioita = () => (this.state.hyva + this.state.neutraali + this.state.huono);

  laskeKeskiarvo = () => (this.state.hyva - this.state.huono) / this.arvioita();
  laskePosOsuus = () => this.state.hyva / this.arvioita() * 100;

  render() {
    return (
      <div>
        <Otsikko otsikko={'anna palautetta'} />
        <Button handleClick={this.lisaaHyva} text={'hyvä'} />
        <Button handleClick={this.lisaaNeutraali} text={'neutraali'} />
        <Button handleClick={this.lisaaHuono} text={'huono'} />
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
