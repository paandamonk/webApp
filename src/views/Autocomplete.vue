<template>

<div>

<v-select label="type" :options="this.exercises"></v-select>
    <h2>{{this.state}}a</h2>
</div>

</template>
<script>


import * as api from '@/services/api_access';
// eslint-disable-next-line

let loopTimer = null;
export default {
    data(){
        return {
            state: {

                exercises: [],
                friends: [],
                goals: [],
                userId: "",
                
            },
            exercises: [],
            user: null,
            
            
        }
    },
    created(){
      let loopTimer = setInterval(this.refresh, 1000);
      this.getCurrentUser();
    },
    methods: {
        refresh(){
            api.GetState()
            .then(x=> this.state = x)
        },
        getAll(){
            api.getFriends()
           .then((response) => {
               this.friends = response;
           });
           api.getExercises()
           .then((response) => {
               this.exercises = response;
           });
           api.getGoals()
           .then((response) => {
               this.goals = response;
           });
        },
        getGoalList(){
            api.getGoals()
           .then((response) => {
               this.goals = response;
           });
        },
       getFriendList(){
           api.getFriends()
           .then((response) => {
               this.friends = response;
           })
       },
       getExerciseList(){
           api.getExercises()
           .then((response) => {
               this.exercises = response;
           });
       },
       getCurrentUser(){
           api.getCurrentUser()
           .then((response) => {
                this.user = response;
                this.userId = response.userId;
              });       
       },
       userId: ()=> api.userId
    },
    beforeMount(){
        this.getCurrentUser();
        this.getAll();
    }   
}
</script>