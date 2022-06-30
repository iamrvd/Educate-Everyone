<template>
  <div>
    <sidebar />
    <div class="registerForm">
          <h1>Register</h1>
          <div class="loginID">
            <img src="static/register.svg" id="registerAvatar" alt="Register avatar">
          </div>
          <form>
              <div>
                <label>First Name</label>
                <input type="text" class="form-control" placeholder="first name" v-model="fname" required>
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" class="form-control" placeholder="last name" v-model="lname" required>
              </div>
              <div>
                <label>User Name</label>
                <input type="text" class="form-control" placeholder="username" v-model="username" required>
              </div>
              <div>
                <label>Password</label>
                <input type="password" class="form-control" placeholder="password" v-model="password" required>
              </div>
              <div>
                <label for="userRole">Choose Role</label>
                <select v-model="userRole">
                        <option :value="category" v-for="category in categories" v-bind:key="category">{{category}}</option>
                </select>
              </div>
            <div id="formButtons">
               <button type="submit" @click="register" class="formButton">Sign Up</button>
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
  name: 'Register',
  data() {
    return {
      fname: '',
      lname: '',
      username: '',
      password: '',
      userRole: '',
      categories: ['Student','Teacher'],
      errors: '',
      logoutKey: true
    }
  },
  methods: {
    register() {
      let newUser = {
        fname: this.fname,
        lname: this.lname,
        password: this.password,
        username: this.username,
        userRole: this.userRole
      }
      
     axios.post("http://localhost:"+process.env.VUE_APP_API_PORT+"/register", newUser)
                .then((response) => {
                console.log(response);
                if (response.status === 200 || response.status === 201) {
                this.$router.push('/login');
                }
                })  
                .catch((error) => {
                console.log(error);
                });
                //Reset Form
                // this.fname='';
                // this.lname='';
                // this.password='';
                // this.userRole='';
                // this.username='';
    }
  }
}
</script>

