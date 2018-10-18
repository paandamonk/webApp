
class exercises{
    constructor(type, time, duration){
        this.type = type;
        this.time = time;
        this.duration = duration;
    }
}

class goals{
    constructor(type, value){
        this.type = type;
        this.value = value;
    }
}

module.exports = {
    exercises, goals
};


