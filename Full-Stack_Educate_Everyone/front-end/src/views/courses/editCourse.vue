<template>
    <div>
    <sidebar />
    <section>
    <h1>Edit Course</h1>
    <div>
        <form>
            <div>
                <label> Lesson Name </label>
                <input type="text" class="form-control" placeholder="Lesson Name" v-model="Course.lessonName">
            </div>
            <div>
                <label> Topic Description </label>
                <input type="text" class="form-control" placeholder="Topic Description" v-model="Course.description">
            </div>
            <div>
            <label for="category">Category</label>
            <select v-model="Course.category">
                <option :value="course" v-for="course in courses" v-bind:key="course">{{course}}</option>
            </select>
            </div>
            <div>
                <label> Youtube Link </label>
                <input type="text" class="form-control" placeholder="Youtube Link " v-model="Course.videoUrl">
            </div>
            <button type="submit" @click="editAPI()">Submit</button>
        </form>
    </div>
    </section>  
    </div>
</template>

<script>
    import axios from 'axios';
    import Sidebar from '../sidebar/sidebar.vue';
    export default {
        components :{
            'sidebar' : Sidebar
        },
        props: ['video'],
        data() {
            return {
                Course : {
                    lessonName: '',
                    description: '',
                    category: '',
                    videoUrl: '',
                    username: ''
                },
                courses : ["Science", "Math", "English"]
            }
        },
        created() {
            let vm = this;
            vm.token = localStorage.getItem('token');
            if(!vm.token){
                this.$router.push({name: "LoginUser"});
            }
            this.username = localStorage.getItem('username');   
            this.Course= {
                    id: localStorage.getItem('id'),
                    lessonName: localStorage.getItem('lessonName'),
                    description: localStorage.getItem('description'),
                    category: localStorage.getItem('category'),
                    videoUrl: localStorage.getItem('videoUrl'),
            }
        },
        methods: {
            editAPI() {
                let videos = {
                    videotitle: this.Course.lessonName,
                    description: this.Course.description,
                    category: this.Course.category,
                    videoUrl: this.Course.videoUrl,
                    author: this.username
                }
                console.log(videos);
                axios.put(`http://localhost:${process.env.VUE_APP_API_PORT}/api/videos/edit/${this.Course.id}`, videos)
                .then((response) => {
                console.log(response);
                this.$router.push({name: "PublishedCourses"});
                })  
                .catch((error) => {
                console.log(error);
                });
            }
        }
    }
</script>