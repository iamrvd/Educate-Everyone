<template>
    <div>
    <sidebar />
    <section>
    <h1>Create a course</h1>
    <div>
        <form> 
            <div>
                <label> Lesson Name </label>
                <input type="text" class="form-control" placeholder="Lesson Name" v-model="Course.lessonName" required>
            </div>
            <div>
                <label> Topic Description </label>
                <input type="text" class="form-control" placeholder="Topic Description" v-model="Course.description" required>
            </div>
            <div>
            <label for="category">Category</label>
            <select v-model="Course.category" required>
                <option :value="course" v-for="course in courses" v-bind:key="course">{{course}}</option>
            </select>
            </div>
            <div>
                <label> Youtube Link </label>
                <input type="url" class="form-control" placeholder="Youtube Link " v-model="Course.videourl" required>
            </div>
            <div id="formButtons">
                <button type="submit" class="formButton" @click="addToAPI">Submit</button>
            </div>
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
        data() {
            return {
                Course : {
                    lessonName: '',
                    description: '',
                    category: '',
                    videourl: '',
                    username: ''
                },
                courses : ["Science", "Math", "English"],
                error: [],
            }
        },
        created() {
            let vm=this;
            vm.token = localStorage.getItem('token');
            if(!vm.token){
                this.$router.push({name: "LoginUser"});
            }
            this.username = localStorage.getItem('username');

        },
        methods: {
            
            addToAPI() {
                let videos = {
                    videotitle: this.Course.lessonName,
                    description: this.Course.description,
                    category: this.Course.category,
                    videourl: this.Course.videourl,
                    author: this.username

                }
                console.log(videos);
                axios.post("http://localhost:"+process.env.VUE_APP_API_PORT+"/api/courses/new", videos)
                .then((response) => {
                console.log(response);
                this.$router.push({name: "Course"});
                })  
                .catch((error) => {
                console.log(error);
                });
    
            }
        }
    }
</script>