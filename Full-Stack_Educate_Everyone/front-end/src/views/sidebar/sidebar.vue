<template>
    <div id="navContainer" class="flexCon">
		<h2 class="hidden">Main Navigation</h2>
        <button id="button" @click="hamburgerMenu($event)"></button>
		<div id="burgerCon" ref="myRef">
			<ul id="burgerMenu">
				<li><router-link :to="`/home`">Home</router-link></li>
				<li><router-link :to="`/quizzes`">Quiz</router-link></li>
                <li><router-link :to="`/courses`">Courses</router-link></li>
				<li :class="{'hideNavOption': isStudent}"><router-link  :to="`/courses/create`" >Create Course</router-link></li>
				<li :class="{'hideNavOption': isStudent}"><router-link  :to="`/quizzes/new/create`">Create Quiz</router-link></li>
                <li :class="{'hideNavOption': isStudent}"><router-link  :to="`/courses/published`">Published Courses</router-link></li>
                <li><a href="#" @click="logout" :class="{'logoutButton' : logoutKey}">Logout</a></li>
            </ul>
		</div>
        <div id="logoCon">
            <img class="mainLogo" id="logoA" src="static/educate_everyone.svg" alt="educate everyone logo">
        </div>
	</div>
</template>
<script>
export default {
    data() {
            return {
                isStudent: false,
                logoutKey: false
            }
    },
    created(){
        let role = localStorage.getItem('role');
        if(role === "Student"){
            this.isStudent=true;
            console.log(this.isStudent);
            }
        else{
            this.isStudent=false;
            }

    },
    methods: {
        logout() {
            localStorage.removeItem('token');
            this.$router.push({name: "LoginUser"});
        },
        hamburgerMenu(event) {
            // this.$el.querySelector("#button").classList.toggle("slideToggle");
             let button = event.target;
             button.classList.toggle('expanded');
             this.$refs.myRef.classList.toggle('slideToggle');
        }
    }
}
</script>