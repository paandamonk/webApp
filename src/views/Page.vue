<template>

<div>

<div class="Add">

    

    <h1>Add exercises and goals here!</h1>

<form>
  <div class="form-group">
    <label for="type">Exercise Type</label>
    <input type="text" class="form-control" id="type"  placeholder="Enter exercise type" v-model="exercise.type">
  </div>
  <div class="form-group">
    <label for="time">Time of Exercise</label>
    <input type="text" class="form-control" id="time" placeholder="Enter time of exercise" v-model="exercise.time">
  </div>
  <div class="form-group">
    <label for="duration">Duration of Exercise</label>
    <input type="text" class="form-control" id="duration" placeholder="Enter duration of exercise" v-model="exercise.duration">
  </div>
    <button @click.prevent="addExercise()">Submit</button>
</form>
<form>
  <div class="form-group">
    <label for="type">Goal Type</label>
    <input type="text" class="form-control" id="type"  placeholder="Enter the type of goal (ex. Weight loss)" v-model="goal.type">
  </div>
  <div class="form-group">
    <label for="value">Value of Goal</label>
    <input type="text" class="form-control" id="value" placeholder="Enter the value of the goal (ex. 145 lbs)" v-model="goal.value">
  </div>
    <button @click.prevent="addGoal()">Submit</button>
</form>
  </div>

</div>

</template>
<script>
import * as api from '@/services/api_access';

export default {
    data(){
        return {
            
            exercise: {
                type: '',
                time: '',
                duration: ''
            },
            goal: {
                type: '',
                value: ''
            },
            username: '',
            goals: [],
            exercises: [],
        }
    },
    methods: {
        addExercise(){
            if(api.getCurrentUser() !== null){
                api.getCurrentUser()
            .then((response) => {
                this.username = response.username;
            });
            api.addExercise(this.username, this.exercise.type, this.exercise.time, this.exercise.duration);
            this.exercises.push(this.exercise);
            this.exercise.type = '',
            this.exercise.time = '',
            this.exercise.duration = ''
            }
    
        },
        addGoal(){
            api.getCurrentUser()
            .then((response) => {
                this.username = response.username;
            });
            api.addGoal(this.username, this.goal.type, this.goal.value);
            this.goals.push(this.goal);
            this.goal.type = '',
            this.goal.value = ''
        }
    },
}
</script>