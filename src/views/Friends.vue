<template>

<div>

<div class="Friends">

    

    <h1>Friends List</h1>
    <form>
    <div class="form">
        <label for="username">Add friend</label>
        <input type="text" class="form-control" id="username"  placeholder="Enter friend username" v-model="username">
    </div>
    <button @click.prevent="addFriend()">Submit</button>
    </form>
    <ul class="list-group list-group-flush">
        <li v-for="friend in friends" :key="friend">
         {{friend}}
         </li>
    </ul>

</div>

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
                friends: [],
                username: '',
                id: '',
                loggedIn: null,
                friend: ''
                
            },
            
            
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
       getFriendList(userId){
           api.getFriends(userId)
           .then((response) => {
               this.friends = response;
           })
       },
       getCurrentUser(){
           api.getCurrentUser()
           .then((response) => {
                this.loggedIn = response;
                this.userId = response.userId;
              });
       },
       addFriend(){
           this.getCurrentUser();
           api.addFriend(this.userId, this.username)
           .then((response) => {
               this.username = response.username;
               this.friend = response;
               this.friends.push(response);
               this.loggedIn.friends = this.friends;
           });
           this.friend = '';
       },
       userId: ()=> api.userId
    },
    beforeMount(){
        this.getCurrentUser();

    }   
}
</script>