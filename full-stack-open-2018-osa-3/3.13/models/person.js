const mongoose = require('mongoose');

const url = 'mongodb://<dbuser>:<dbpassword>@ds221631.mlab.com:21631/fullstack-persons';

mongoose.connect(url);

const Person = mongoose.model('Person', {
  name: String,
  number: String,
});

module.exports = Person;
