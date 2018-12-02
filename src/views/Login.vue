<template>
<div>

<div class="Login">

    

    <h1>Login through FaceBook, all you need is a username!</h1>
    <h2>Registering as: {{loggedIn}}</h2>
    <div v-if="loggedIn === null">
    <button @click.prevent="login()">Login</button>
    </div>
    <form id="signup-form" @click.prevent>
      <input type="text" placeholder="Enter your username" v-model="username"/>
      <input type="text" placeholder="Enter your id" v-model="id"/>
      <button @click.prevent="Submit()">Submit</button>
    </form>
    <p>User is named: {{userList}}</p>

  </div>

</div>

</template>

<style>

</style>

<script>
    import * as api from '@/services/api_access';
    import * as fb from '@/services/facebook';


    export default {
    data(){
        return {
            username: '',
            id: '',
            loggedIn: null,
            userdata: '',
            userList: [],
        }
    },
    methods: {
        Submit(){
          if(this.username.length > 0){
               api.register(this.username, this.id)
          .then((response) => {
            this.userList.push(response);
          });
          this.username = '';
          this.id = ''
          //this.id = id + 1;
            }
        },
        login() {
            fb.FBLogin(() => {
              api.getCurrentUser()
              .then((response) => {
                this.loggedIn = response;
                this.id = response.id;
                this.userList.push(response);
              })
            });
        }, 
    },
    beforeMount(){
      this.login();
    },
}
</script>