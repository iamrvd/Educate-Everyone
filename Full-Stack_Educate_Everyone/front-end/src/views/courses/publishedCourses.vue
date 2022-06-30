<template>
<div>
    <sidebar />
    <section>
        <h1>Published Courses</h1>
        <div v-if="loading">Loading...</div>
        <div v-else class="courseBlock">
            <div class="loginID">
                <img src="static/published-courses.svg" id="publishedCourseAvatar" alt="Published Course avatar">
            </div>
            <ul>
                <li v-for="video in videos" v-bind:key="video.id">
                    <router-link :to="`/courses/published/${video._id}`">{{ video.videotitle }}</router-link> 
                </li>
            </ul>
        </div>
    </section>
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
                videos : [],
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
            let username = localStorage.getItem('username');  
            fetch("http://localhost:"+process.env.VUE_APP_API_PORT+"/api/videos")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
               
                let newdata =[];

               for(let i=0; i < data.length; i++)
                {
                    if(data[i].author === username)
                    {
                        data[i].videourl = "https://www.youtube.com/embed/" + `${data[i].videourl}`.split("v=")[1].substring(0,11) + '?&iv_load_policy=3';
                        newdata.push(data[i]);
                    }
                } 
                vm.videos = newdata;
                //console.log(vm.videos);
                vm.loading = false;

            })
        }
    }
    
</script>