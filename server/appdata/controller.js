const express = require('express');
const {User, Exercise, Goal, Users} = require('./user');
const Joi = require('joi');
const app = express.Router();
app.use(express.json());

var users = new Users();
var mainuser = null;
//var testuser = new User("",  "");
//let userlistx = [{username:'jimmy', password:'jimmypassword'}];
//users.userlist.push(testuser);
//userlistx.push(testuser.username);


app.get('/', (req, res) => {
    res.send(users);
});

app.post('/', (req, res) => {
 /*   const { error } = validateUser(req.body);
    if (error){
      res.status(400).send(error.details[0].message);
      return;
  }*/
    var user = users.userlist.find(c => c.id == req.body.id);
    if(!user){
        user = new User(req.body.username, req.body.id);
    users.userlist.push(user);
    if(mainuser === null){
        mainuser = user;
    }
    res.send(user);
    }
    else{
        res.status(404).send('User already exists');
    }
    
    //userlistx.push(user.username);
});
app.get('/mainuser', (req, res) => {
    res.send(mainuser);
});


app.get('/:username/goals', (req, res) => {
    mainuser = users.userlist.find(c => c.username === req.params.username);
    res.send(mainuser.goals);
});
app.post('/:username/goals', (req, res) => {
    const goal = new Goal(req.body.type, req.body.value);
    mainuser = users.userlist.find(c => c.username === req.params.username);
    goal.id = mainuser.goals.length + 1;
    mainuser.goals.push(goal);
    res.send(mainuser.goals);
});
app.get('/:username/goals/:id',(req, res) =>{
    mainuser = users.userlist.find(c => c.username === req.params.username);
    res.send(mainuser.goals[parseInt(req.params.id)-1]);
});

app.get('/:username/exercises', (req, res) => {
    mainuser = users.userlist.find(c => c.username === req.params.username);
    res.send(mainuser.exercises);
});

app.post('/:username/exercises', (req, res) => {
    const exercise = new Exercise(req.body.type, req.body.time, req.body.duration);
   // mainuser = users.userlist.find(c => c.username === req.params.username);
    exercise.id = mainuser.exercises.length + 1;
    mainuser.exercises.push(exercise);
    res.send(mainuser.exercises);
});
app.get('/:username/exercises/:id',(req, res) =>{
    mainuser = users.userlist.find(c => c.username === req.params.username);
    res.send(mainuser.exercises[parseInt(req.params.id)-1]);
});
app.get('/:username/friends', (req, res) => {
    mainuser = users.userlist.find(c => c.username === req.params.username);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.friends);
});
app.post('/:username/friends', (req, res) => {
    const friend = users.userlist.find(c => c.username === req.body.username);
    if (!friend) res.status(404).send('The username does not exist.');
    mainuser = users.userlist.find(c => c.username === req.params.username);
    mainuser.friends.push(friend);
    res.send(mainuser.friends);
});
app.get('/:username', (req, res) => {
    //mainuser = new User();
    mainuser = users.userlist.find(c => c.username === req.params.username);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser);
});
app.put('/:username', (req, res) => {  //changing username
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
/* app.put('/:password', (req, res) => {
    mainuser = users.userlist.find(c => c.password === req.params.password);
    if (!mainuser) res.status(404).send('The username does not exist.');
      const { error } = validateUser(req.body);
      if (error){
        res.status(400).send(error.details[0].message);
        return;
    }
    mainuser.password = req.body.password;
    res.send(mainuser);
}); */
function validateUser(user){
    const schema = {
        username: Joi.string().min(4).required(),
        //password:  Joi.string().min(10).required()
      };
      return Joi.validate(user, schema);
}
module.exports = app;