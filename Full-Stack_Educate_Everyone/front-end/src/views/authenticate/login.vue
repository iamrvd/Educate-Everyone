<template>
<div>
    <sidebar />
    <div class="loginForm">
        <h1 class="headerText">Login</h1>
        <div class="loginID">
            <img src="static/login.svg" id="loginAvatar" alt="Login avatar">
        </div>
        <form>
            <div>
                <label>User Name</label>
                <input type="text" class="form-control" placeholder="username" v-model="username" required>
            </div>
            <div>
                <label>Password</label>
                <input type="password" class="form-control" placeholder="password" v-model="password" required>
            </div>
            <div id="formButtons">
                <button type="submit" @click="login"  class="formButton">Login Now</button>
            </div>
        </form>
    </div>
</div>
</template>
<script>
import Sidebar from '../sidebar/sidebar.vue';
import axios from 'axios';
export default {
    components :{
            'sidebar' : Sidebar
        },
    name: 'Login',
    data() {
            return {
            username: '',
            password: '',
            errors:'',
            logoutKey: true
        }
    },
    methods: {
      login() {
          let credentials = {
                    username: this.username,
                    password: this.password
      }
      axios.post("http://localhost:"+process.env.VUE_APP_API_PORT+"/login", credentials)
                .then((response) => {
                console.log(response);
                
                   let username = response.data.username;
                   let fname = response.data.fname;
                   let lname = response.data.lname;
                   let role = response.data.userRole;

                localStorage.setItem('username', username);
                localStorage.setItem('fname', fname);
                localStorage.setItem('lname', lname);
                localStorage.setItem('role', role);
                localStorage.setItem('token', response.data.token);
                this.$router.push({name: "Course"});
                })  
                .catch((error) => {
                console.log(error);
                });
      }
    }
}
</script>

