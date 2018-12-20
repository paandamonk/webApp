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
   // var userlist = new Users();
    var user = users.userlist.find(c => c.userId == req.body.userId);
    if(!user){
        user = new User(req.body.username, req.body.userId);
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
app.get('/mainuser/goals', (req, res) => {
    res.send(mainuser.goals);
});
app.get('/mainuser/exercises', (req, res) => {
    res.send(mainuser.exercises);
});
app.get('/mainuser/friends', (req, res) => {
    res.send(mainuser.friends);
});


app.get('/:userId/goals', (req, res) => {
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.goals);
});
app.post('/:userId/goals', (req, res) => {
    const goal = new Goal(req.body.type, req.body.value);
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    goal.id = mainuser.goals.length + 1;
    mainuser.goals.push(goal);
    res.send(mainuser.goals);
});
app.get('/:userId/goals/:id',(req, res) =>{
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.goals[parseInt(req.params.id)-1]);
});

app.get('/:userId/exercises', (req, res) => {
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.exercises);
});

app.post('/:userId/exercises', (req, res) => {
    const exercise = new Exercise(req.body.type, req.body.time, req.body.duration);
   // mainuser = users.userlist.find(c => c.username === req.params.username);
    exercise.id = mainuser.exercises.length + 1;
    mainuser.exercises.push(exercise);
    res.send(mainuser.exercises);
});
app.get('/:userId/exercises/:id',(req, res) =>{
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.exercises[parseInt(req.params.id)-1]);
});
app.get('/:userId/friends', (req, res) => {
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.friends);
});
app.get('/:userId/friends/:id', (req, res) => {

    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser.friends);
});
app.post('/:userId/friends', (req, res) => {
    const friend = users.userlist.find(c => c.username === req.body.username);
    if (!friend) res.status(404).send('The username does not exist.');
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    const test = mainuser.friends.find(c => c.username === req.body.username);
    if(test===friend) res.status(404).send('User already a friend.');
    mainuser.friends.push(friend);
    res.send(mainuser.friends);
});
app.get('/:userId', (req, res) => {
    //mainuser = new User();
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
    if (!mainuser) res.status(404).send('The username does not exist.');
    res.send(mainuser);
});
app.put('/:userId', (req, res) => {  //changing username
    mainuser = users.userlist.find(c => c.userId === req.params.userId);
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