const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person.js');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'));

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => res.json(persons.map(Person.format)))
    .catch(error => {
      console.log(error);
      res.status(500).end();
    })
});

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(persons => res.send(`
      <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
      <p>${new Date()}</p>
    `))
    .catch(error => {
      console.log(error);
      res.status(500).end();
    })
});

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
        if (person) {
          res.json(Person.format(person));
        } else {
          res.status(404).end();
        }
      }
    )
    .catch(error => {
      console.log(error);
      res.status(400).send({ error: 'malformed id'});
    })
});

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({error: 'name is missing'});
  }
  if (body.number === undefined) {
    return res.status(400).json({error: 'number is missing'});
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person
    .save()
    .then(p => res.json(Person.format(p)))
    .catch(error => {
      console.log(error);
      res.status(500).end();
    });
});

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => res.status(400).send({ error: 'person not found'}));
});

app.put('/api/persons/:id', (req, res) => {
  const body = req.body;
  if (body.name === undefined) {
    return res.status(400).json({error: 'name is missing'});
  }
  if (body.number === undefined) {
    return res.status(400).json({error: 'number is missing'});
  }

  const person = {
    name: body.name,
    number: body.number
  };

  Person
    .findByIdAndUpdate(req.params.id, person, {new: true})
    .then(p => res.json(Person.format(p)))
    .catch(error => {
      console.log(error);
      res.status(400).send({ error: 'malformed id'});
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});
