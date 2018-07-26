const mongoose = require('mongoose');

const url = 'mongodb://<dbuser>:<dbpassword>@ds221631.mlab.com:21631/fullstack-persons';

mongoose.connect(url);

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  }
);

personSchema.statics.format = function(person) {
  return {
    name: person.name,
    number: person.number,
    id: person._id
  };
};

const Person = mongoose.model('Person', personSchema);

module.exports = Person;
