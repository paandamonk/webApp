<template>
<div>

<div class="Login">

    

    <h1>Login through FaceBook!</h1>
    <div v-if="loggedIn === null">
        <h2>Click the button to continue.</h2>
    <button @click.prevent="login()">Login</button>
    </div>
    <div v-if="loggedIn !== null">
       <h2>Logged in as: {{loggedIn.username}}</h2>
    </div>
    <form id="signup-form">
      <input type="text" placeholder="Enter your username" v-model="username"/>
      <input type="text" placeholder="Enter your id" v-model="id"/>
      <button @click.prevent="Submit()">Submit</button>
    </form>
    <p>User is named: {{userList}}</p>
    <h3>Display user list: {{userlist}}</h3>

  </div>

</div>

</template>

<style>

</style>

<script>
    import * as api from '@/services/api_access';
    import * as fb from '@/services/facebook';
    // eslint-disable-next-line
    let loopTimer = null;

    export default {
    data(){
        return {
            username: '',
            id: '',
            loggedIn: null,
            userList: [],
        }
    },
    created(){
      let loopTimer = setInterval(this.refresh, 1000);
      api.getCurrentUser().then((response) => {
        this.loggedIn = response;
      });
      this.getUserList();
    },
    methods: {
        Submit(){
          if(this.username.length > 0){
               api.register(this.username, this.id)
          .then((response) => {
            this.userList.push(response);
          });
          this.username = '';
          this.id = '';
          //this.id = id + 1;
            }
        },
        login() {
            fb.FBLogin(() => { 
              api.getCurrentUser()
              .then((response) => {
                this.loggedIn = response;
                this.username = response.username;
                this.userId = response.userId;
                this.userList.push(response);
              })
            });
        },
        getUserList() {
          api.getUsers()
          .then((response) => {
            this.userlist = response.userlist;
          });
        },
        userId: ()=> api.userId 
    },
    beforeMount(){
      if(loggedIn === null){
        this.login();
      }
      this.getUserList();
    },
}
</script>