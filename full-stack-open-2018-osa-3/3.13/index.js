const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person.js');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

const formatPerson = (person) => (
  {
    name: person.name,
    number: person.number,
    id: person._id
  }
);

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons.map(formatPerson)));
});

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons => res.send(`
      <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
      <p>${new Date()}</p>
    `));
});

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => res.json(formatPerson(person)));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
