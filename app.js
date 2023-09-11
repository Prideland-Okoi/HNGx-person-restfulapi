const express = require('express');
const mysql = require('mysql');
const Person = require('./models/person');

const app = express();

// Initialize the database connection
Person.connection.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

// Create a router
const router = express.Router();

// Create a person
router.post('/api/persons', (req, res) => {
  // Validate the request body
  if (!req.body.name || typeof req.body.name !== 'string') {
    res.status(400).send('The name field must be a string.');
    return;
  }

  // Create the person in the database
  const person = new Person({
    name: req.body.name,
  });
  person.save((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(201).send(person);
  });
});

// Get all people
router.get('/api/persons', (req, res) => {
  // Get all the people from the database
  Person.findAll((err, persons) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(people);
  });
});

// Get a person by name
router.get('api/persons/:name', (req, res) => {
  // Get the person from the database by name
  Person.findOne({ name: req.params.name }, (err, person) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (!person) {
      res.status(404).send('The person was not found.');
      return;
    }

    res.status(200).send(person);
  });
});

// Update a person
router.put('api/persons/:name', (req, res) => {
  // Validate the request body
  if (!req.body.name || typeof req.body.name !== 'string') {
    res.status(400).send('The name field must be a string.');
    return;
  }

  // Update the person in the database
  Person.updateOne({ name: req.params.name }, {
    $set: {
      name: req.body.name,
    },
  }, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send('The person was updated.');
  });
});

// Delete a person
router.delete('api/persons/:name', (req, res) => {
  // Delete the person from the database
  Person.deleteOne({ name: req.params.name }, (err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send('The person was deleted.');
  });
});

// Attach the router to the app
app.use('/api', router);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
