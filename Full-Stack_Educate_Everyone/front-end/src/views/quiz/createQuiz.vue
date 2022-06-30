<template>
    <div>
        <sidebar />
    <section>
    <h1>Create a Quiz</h1>
    <div>
        <form>
            <div>
                <label> Quiz Title </label>
                <input type="text" class="form-control" placeholder="Quiz Title" v-model="Quiz.quizTitle" required>
            </div>
            <div>
            <label for="category">Category</label>
            <select v-model="Quiz.category" required>
                <option :value="category" v-for="category in categories" v-bind:key="category">{{category}}</option>
            </select>
            </div>
            <div class="QuizForm">
                <h2>Questions Added: {{ questionsAdded }}</h2>
                <div>
                    <label> Question </label>
                    <input type="text" class="form-control" placeholder="Question" v-model="Quiz.question" required>
                </div>
                <div>
                    <label> Correct Answer </label>
                    <input type="text" class="form-control" placeholder="Correct Answer" v-model="Quiz.correct_answer" required>
                </div>
                <div>
                    <label> Incorrect Option 1 </label>
                    <input type="text" class="form-control" placeholder="Wrong Answer 1" v-model="Quiz.inCorrect1" required>
                </div>
                <div>
                    <label> Incorrect Option 2 </label>
                    <input type="text" class="form-control" placeholder="Wrong Answer 2" v-model="Quiz.inCorrect2" required>
                </div>
                <div>
                    <label> Incorrect Option 3 </label>
                    <input type="text" class="form-control" placeholder="Wrong Answer 3" v-model="Quiz.inCorrect3" required>
                </div>
            </div>
            <div id="formButtons">
                <button @click="addQuestion" class="formButton">Add Question</button>
                <button type="submit" @click="addToAPI" class="formButton">Submit</button>
            </div>
        </form>
    </div>
    </section>
    </div>
</template>

<script>
    import Sidebar from '../sidebar/sidebar.vue';
    import axios from 'axios';
    export default {
        components :{
            'sidebar' : Sidebar
        },
        data() {
            return {
                Quiz: {
                            quizTitle   : '',
                            category: '',
                            question: '',
                            correct_answer: '',
                            inCorrect1: '',
                            inCorrect2: '',
                            inCorrect3: '',
                        },
                        questionsAdded: 0,
                        categories : ["Science", "Math", "English"],
                        formData: []
            }
        },
        created() {
            let vm = this;
            vm.token = localStorage.getItem('token');
            if(!vm.token){
                this.$router.push({name: "LoginUser"});
            }
        },
        methods: {
            addQuestion() {
                let wrong_Answer = [];
                wrong_Answer.push(this.Quiz.inCorrect1, this.Quiz.inCorrect2, this.Quiz.inCorrect3);
                //console.log(wrong_Answer);
                let questions = {
                    question: this.Quiz.question,
                    correct_answer: this.Quiz.correct_answer,
                    incorrect_answer: wrong_Answer
                }

                this.formData.push(questions);
                console.log(this.formData);
                this.questionsAdded++;
                //reset form
                this.Quiz.question = '';
                this.Quiz.correct_answer = '';
                this.Quiz.inCorrect1 = '';
                this.Quiz.inCorrect2 = '';
                this.Quiz.inCorrect3 = '';

            },
            addToAPI() {
                console.log(this.questions);
                let finalData = {
                    quizTitle: this.Quiz.quizTitle,
                    category: this.Quiz.category,
                    quizContent: this.formData
                }
                axios.post("http://localhost:"+process.env.VUE_APP_API_PORT+"/api/quizzes/new", finalData)
                .then((response) => {
                console.log(response);
                this.$router.push({name: "ListQuizzes"});
                })  
                .catch((error) => {
                console.log(error);
                });
            }
        }
    }
</script>