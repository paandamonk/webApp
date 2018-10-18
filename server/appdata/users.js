const express = require('express');
const {User, Exercise, Goal} = require('./user');
const Joi = require('joi');
const app = express.Router();
app.use(express.json());

const users = [
    {username: 'jimmy', password: 'blimpman101'},
    {username: 'paul', password: 'bossbabyrox54'},
    {username: 'craig', password: 'animalcrossing'}
];

app.get('/', (req, res) => {
    res.send(users);
});

app.post('/', (req, res) => {
    const { error } = validateUser(req.body);
    if (error){
      res.status(400).send(error.details[0].message);
      return;
  }
    const user = {
      username: req.body.username,
      password: req.body.password
    };
    users.push(user);
    res.send(user);
});
app.get('/:username/friends', (req, res) => {
    const user = users.find(c => c.username === req.params.username);
    if (!user) res.status(404).send('The username does not exist.');
    res.send(user.friends);
});

app.get('/:username/exercises', (req, res) => {
    const user = users.find(c => c.username === this.username);
    res.send(user.exercises);
});

app.post('/:username/exercises', (req, res) => {
    const exercise = new Exercise(req.body.type, req.body.time, req.body.duration);
    const user = users.find(c => c.username === this.username);
    user.addExercise(exercise);

});

app.post('/:username/friends', (req, res) => {
    const friend = users.find(c => c.username === req.params.username);
    if (!friend) res.status(404).send('The username does not exist.');
    
})

app.get('/:username', (req, res) => {
    const user = users.find(c => c.username === req.params.username);
    if (!user) res.status(404).send('The username does not exist.');
    res.send(user);
});

app.put('/:username', (req, res) => {
    const user = users.find(c => c.username === req.params.username);
    if (!user) res.status(404).send('The username does not exist.');
    const schema = {
        username: Joi.string().min(4).required()  
      };

      const { error } = validateUser(req.body);
      if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    user.username = req.body.username;
    res.send(user);
});

app.put('/:password', (req, res) => {
    const user = users.find(c => c.password === req.params.password);
    if (!user) res.status(404).send('The username does not exist.');
    const schema = {
        username: Joi.string().min(10).required()  
      };

      const { error } = validateUser(req.body);
      if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    user.password = req.body.password;
    res.send(user);
});

function validateUser(user){
    const schema = {
        username: Joi.string().min(4).required(),
        password:  Joi.string().min(10).required()
      };
      return Joi.validate(user, schema);
};

module.exports = app;