<template>
    <div>
        <sidebar />
        <h1 class="hidden">Quiz Topics</h1>
        <div class="loginID">
            <img src="static/quiz.svg" id="quizAvatar" alt="Quiz avatar">
        </div>
        <ul>
            <li v-for="quiz in quizzes" v-bind:key="quiz._id">
                <router-link :to="`/quizzes/${quiz._id}`">{{ quiz.quizTitle }}</router-link> 
            </li>
        </ul>
    </div>
    
</template>

<script>
import Sidebar from '../sidebar/sidebar.vue'
export default {
    components :{
            'sidebar' : Sidebar
        },
    data() {
            return {
                quizzes : [],
                loading: true
            }
        },
        created() {
            this.loading = true;
            var vm = this;
            vm.token = localStorage.getItem('token');
            if(!vm.token){
                this.$router.push({name: "LoginUser"});
            }
            fetch("http://localhost:"+process.env.VUE_APP_API_PORT+"/api/quizzes")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                vm.quizzes = data;
                console.log(vm.quizzes);
                vm.loading = false;  

            });
        }
    }
</script>