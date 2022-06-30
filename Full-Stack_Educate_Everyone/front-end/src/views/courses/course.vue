<template>
    <div>
        <sidebar />
        <h1>Choose a category</h1>
        <section>
            <div id="courseType">
                <div class="courses">
                    <img src="static/science.png" alt="Science logo" class="videoCategory">
                    <router-link :to="`/courses/science`" class="courseLink">Science</router-link> 
                </div>
                <div class="courses">
                    <img src="static/english.png" alt="English logo" class="videoCategory">
                    <router-link :to="`/courses/english`" class="courseLink">English</router-link> 
                </div>
                <div class="courses">
                    <img src="static/math.png" alt="Math logo" class="videoCategory">
                    <router-link :to="`/courses/math`" class="courseLink">Math</router-link> 
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import Sidebar from '../sidebar/sidebar.vue'
    export default {
        props: ['UserInfo'],
        components :{
            'sidebar' : Sidebar
        },
        data() {
            return {
                token: ''
        }       
        },
        created() {
            let vm = this;
            vm.token = localStorage.getItem('token');
            if(!vm.token){
                this.$router.push({name: "LoginUser"});
            }
            }
    }
</script>