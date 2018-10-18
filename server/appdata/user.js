class Users{
    constructor(){
        this.userlist = [];
    }
}
class User{
    constructor(username,password){
        this.username = username;
        this.password = password;
        this.exercises = [];
        this.goals = [];
        this.friends = [];
    }
}
class Exercise{
    constructor(type, time, duration){
        this.type = type;
        this.time = time;
        this.duration = duration;
        this.id = 0;
    }
}

class Goal{
    constructor(type, value){
        this.type = type;
        this.value = value;
        this.id = 0;
    }
}


module.exports = {
    User, Exercise, Goal, Users
}