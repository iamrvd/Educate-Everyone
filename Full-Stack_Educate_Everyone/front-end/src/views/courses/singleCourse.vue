<template>
<div>
    <sidebar />
    <section>
        <div id="courseContent">
            <h2>{{ video.videotitle }}</h2>
            <p>{{ video.description }}</p>
            <p>Created by: {{ video.author }}</p>
            <div class="videoContent">
                <div id="videoLink" class="iframe-container">
                    <iframe width="560" height="315" v-bind:src="video.videourl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
            <div class="alterButtons">
                <div class="formButtons">
                    <button @click="deleteCourse(video._id)" class="editButton">Delete</button>
                    <button type="submit" @click="editCourse(video)" class="editButton">Edit</button>
                </div>
            </div>
        </div>
    </section>
</div>
</template>
<script>
import Sidebar from '../sidebar/sidebar.vue';
import axios from 'axios';
export default{
    components :{
            'sidebar' : Sidebar
    },
    data() {
        return {
            video : {}
        }
    },
    created() {
        var vm = this;
        let id = this.$route.params.id;
        fetch(`http://localhost:${process.env.VUE_APP_API_PORT}/api/videos/${id}`)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            data.videourl = "https://www.youtube.com/embed/" + `${data.videourl}`.split("v=")[1].substring(0,11) + '?&iv_load_policy=3';
            vm.video = data;
            
        })
    },
    methods: {
        deleteCourse(id){

            axios.delete(`http://localhost:${process.env.VUE_APP_API_PORT}/api/videos/delete/${id}`)
             .then(response => {
                 console.log(response);
                 //element.innerHTML = 'Delete successful';
                 this.$router.push({name: "PublishedCourses"});
             })
             .catch(function (error) {
                // element.parentElement.innerHTML = `Error: ${error.message}`;
                console.log(error.response);
                 console.error('There was an error!', error);
             })

        },
        editCourse(video){
            let lessonName = video.videotitle;
            let description = video.description;
            let category = video.category;
            let videoUrl = video.videourl;
            let id = video._id;

            localStorage.setItem('lessonName', lessonName);
            localStorage.setItem('description', description);
            localStorage.setItem('category', category);
            localStorage.setItem('videoUrl', videoUrl);
            localStorage.setItem('id', id);

            this.$router.push({name: "EditCourse"});
        }
    }
}
</script>