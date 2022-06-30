<template>
    <section>
        <sidebar />
        <h1 class="hidden">Homepage</h1>
        <div class="heroContainer">
            <h2 class="headerText">Welcome to Educate Everyone!</h2>
            <div id="heroImgDiv">
             <img src="static/home-image.png" alt="home_image" id="heroimage">
            </div>
            <p class="heroText">Educate everyone is an education portal designed for NGO's who specialize in educating under-privelleged kids.</p>
            <p class="heroText">Our mission is to educate as many kids as we can, for building a better future.</p>
            <div id="homeButtons">
                <button @click="login" class="homeButton">Login</button>
                <button @click="register" class="homeButton">Register</button>
            </div>
        </div>
    </section>
</template>

<script>
    import Sidebar from './sidebar/sidebar.vue';
    export default {
        components :{
            'sidebar' : Sidebar
        },
        methods: {
            login(){
                this.$router.push({name: "LoginUser"});
            },
            register(){
                this.$router.push({name: "RegisterUser"});
            }
        }
    }
</script>