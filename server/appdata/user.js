//const {exercises, goals} = require('./data');

class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
    }
}
class Exercise{
    constructor(type, time, duration){
        this.type = type;
        this.time = time;
        this.duration = duration;
    }
}

class Goal{
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}


module.exports = {
    User, Exercise, Goal
}