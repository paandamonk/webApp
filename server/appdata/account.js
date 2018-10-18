const {User, Exercise, Goal} = require('./user');

class Account{
    constructor(){
        this.User = User;
        this.exercises = [];
        this.goals = [];
        this.friends = [];
    }
}
module.exports = Account;