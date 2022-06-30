<template>
    <div>
        <sidebar />
    <section>
        <h1>English</h1>
        <div v-if="loading">Loading...</div>
        <div v-else class="courseBlock">
            <ul>
                <li v-for="video in videos" v-bind:key="video.id">
                <div>
                    <div class="courseDescription">
                        <h2>{{ video.videotitle }}</h2>
                        <p>{{ video.description }}</p>
                    </div>
                    <div class="videoContainer">
                        <div id="videoLink" class="iframe-container">
                            <iframe v-bind:src="video.videourl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                         </div>
                    </div>
                </div>
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
            fetch("http://localhost:"+process.env.VUE_APP_API_PORT+"/api/videos")
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                //Convert youtube link to video id for embedding
                console.log(data);
                for(let i=0; i < data.length; i++)
                {
                    data[i].videourl = "https://www.youtube.com/embed/" + `${data[i].videourl}`.split("v=")[1].substring(0,11) + '?&iv_load_policy=3';
                }

                

                let newdata =[];

                 for(let i=0; i < data.length; i++)
                {
                    if(data[i].category == "English")
                    {
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