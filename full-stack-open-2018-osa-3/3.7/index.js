const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(morgan('tiny'));
app.use(bodyParser.json());


let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
  }
];

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/info', (req, res) => {
  res.send(`
    <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
    <p>${new Date()}</p>
  `);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(p => p.id !== id);
  res.status(204).end();
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({error: 'name is missing'});
  }
  if (body.number === undefined) {
    return res.status(400).json({error: 'number is missing'});
  }
  if (persons.some(p => p.name === body.name)) {
    return res.status(400).json({error: 'name must be unique'});
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(1 + Math.random() * 10000000)
  };
  persons = persons.concat(person);
  res.json(person);
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
