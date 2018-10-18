const express = require('express');
const {User, Exercise, Goal, Users} = require('./user');
const Joi = require('joi');
const app = express.Router();
app.use(express.json());

var users = new Users();
var mainuser = new User();
const userlistx = [
    {username:'jimleh', password:'justlikebutta'}
];
users.userlist = userlistx;

app.get('/', (req, res) => {
    res.send(userlistx);
});

app.post('/', (req, res) => {
    const { error } = validateUser(req.body);
    if (error){
      res.status(400).send(error.details[0].message);
      return;
  }
    const user = new User(req.body.username, req.body.password);
    userlistx.push(user);
    res.send(user.username + " " + user.password);
});
app.get('/:username/friends', (req, res) => {
    mainuser = userlistx.find(c => c.username === req.params.username);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.friends);
});

app.get('/:username/goals', (req, res) => {
    mainuser = userlistx.find(c => c.username === req.params.username);
    res.send(mainuser.goals);
});
app.post('/:username/goals', (req, res) => {
    const goal = new Goal(req.body.type, req.body.value);
    mainuser = userlistx.find(c => c.username === req.params.username);
    mainuser.goals.push(goal);
    res.send(mainuser.goals);

});

app.get('/:username/exercises', (req, res) => {
    mainuser = userlistx.find(c => c.username === req.params.username);
    res.send(mainuser.exercises);
});

app.post('/:username/exercises', (req, res) => {
    const exercise = new Exercise(req.body.type, req.body.time, req.body.duration);
    mainuser = userlistx.find(c => c.username === req.params.username);
    mainuser.exercises.push(exercise);
    res.send(mainuser.exercises);

});

app.post('/:username/friends', (req, res) => {
    const friend = userlistx.find(c => c.username === req.body.username);
    if (!friend) res.status(404).send('The username does not exist.');
    mainuser = userlistx.find(c => c.username === req.params.username);
    mainuser.friends.push(friend);
    res.send(mainuser.friends);

    
});

app.get('/:username', (req, res) => {
    mainuser = new User();
    const user = userlistx.find(c => c.username === req.params.username);
    if (!user) res.status(404).send('The username does not exist.');
    res.send(user.username);
});

app.put('/:username', (req, res) => {
    mainuser = users.userlist.find(c => c.username === req.params.username);
    if (!mainuser) res.status(404).send('The username does not exist.');

      const { error } = validateUser(req.body);
      if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    mainuser.username = req.body.username;
    res.send(mainuser);
});

app.put('/:password', (req, res) => {
    mainuser = users.find(c => c.password === req.params.password);
    if (!mainuser) res.status(404).send('The username does not exist.');
      const { error } = validateUser(req.body);
      if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    mainuser.password = req.body.password;
    res.send(mainuser);
});

function validateUser(user){
    const schema = {
        username: Joi.string().min(4).required(),
        password:  Joi.string().min(10).required()
      };
      return Joi.validate(user, schema);
};

module.exports = app;