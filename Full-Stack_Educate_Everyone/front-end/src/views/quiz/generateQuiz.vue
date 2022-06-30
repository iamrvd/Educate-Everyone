<template>
    <div>
        <sidebar />
        <section>
            <div id="quizContainer">
                <div v-if="arrayIndex < questionCount">
                    <h1 class="quizHeader">{{quizzes.quizTitle}}</h1>
                    <hr class="divisionBorder" />
                    <div v-if="loading">Loading...</div>
                    <div v-else>
                        <p class="questionText">{{ questions[arrayIndex].question }}</p>
                    </div>
                        <hr class="divisionBorder" />
                        <div class="answers" v-if="!loading">
                                <label :for="index" v-for="(answer,index) in questions[arrayIndex].answers" v-bind:key="answer"
                                    class="answerLabel"
                                    :class="{'noHover' : answerSelected != '',
                                            'incorrect' : answerSelected == answer,
                                            'correct' : answer == questions[arrayIndex].correct_answer && answerSelected != ''}"
                                    >
                                    <input type="radio"
                                    :id="index" 
                                    class="hidden"
                                    :value="answer" 
                                    v-on:click="isAnswered($event)"
                                    :disabled="answerSelected != ''" />
                                    {{ answer }}
                                </label>
                            <div class="buttonDiv">
                                <button class="nextButton" v-show="answerSelected != '' && arrayIndex < questionCount - 1" @click="changeQuestion">Next Question</button>
                            </div>
                            <div class="buttonDiv">
                                <button class="nextButton" v-show="answerSelected != '' && arrayIndex == questionCount - 1" @click="viewScores">Finish</button>
                            </div>
                        </div>
                    <div v-else>Loading...</div>
                </div>
                <div v-else>
                    <h1 class="quizHeader">Results</h1>
                    <div class="loginID">
                        <img src="static/greatjob.png" id="quizEnd" alt="Great Job">
                    </div>
                    <div class="results">
                        <p>Hey <span class="firstName">{{fname}}</span>! </p>
                        <p>You scored <span class="score"> {{isCorrect}}</span> out of  <span class="total">{{isCorrect+isIncorrect}}</span></p>
                        <div id="homeButtons">
                            <button class="homeButton" @click="quizReset">Try Again</button>
                        </div>
                    </div>
                </div>
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
             questions: [],
             loading: true,   
             answerSelected: '',
             arrayIndex: 0,
             questionCount: 0,
             isCorrect:0,
             isIncorrect:0,
             fname: ''
            };
        },
        created() {
                this.loading = true;
                var vm = this;
                vm.token = localStorage.getItem('token');
                if(!vm.token){
                    this.$router.push({name: "LoginUser"});
                }
                this.fname = localStorage.getItem('fname');
                let id = this.$route.params.id;
                fetch(`http://localhost:`+process.env.VUE_APP_API_PORT+`/api/quizzes/${id}`)
                .then(function(response){
                    return response.json();
                })
                .then(function(data){
                    vm.quizzes = data;
                    //console.log(vm.quizzes)
                    //console.log(vm.quizzes.quizContent[1].question);
                    let newData = data.quizContent.map((question) => {
                        question.answers = [
                        question.correct_answer,
                        ...question.incorrect_answer
                        ];
                    //this.shuffleArray(question);
                    return question;
                    });
                    console.log(newData);
                    vm.questions = newData;
                    vm.loading = false;
                    console.log(vm.questions);
                    vm.questionCount = vm.questions.length;
                    //console.log(this.questionCount);
                });
        },
        methods: {
            isAnswered(e) {
                this.answerSelected = e.target.value;
                //console.log(this.answerSelected);
                if(this.answerSelected == this.questions[this.arrayIndex].correct_answer){
                    this.isCorrect++;
                }
                else{
                    this.isIncorrect++;
                }
            },
            changeQuestion() {
                this.arrayIndex++,
                this.answerSelected='';
            },
            viewScores() {
                //console.log("viewScores called");
                this.arrayIndex++;
            },
            quizReset(){
                this.arrayIndex = 0;
                this.answerSelected = '';
                this.isCorrect = 0;
                this.isIncorrect = 0
            },
            shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
                }
            }
        }
    }
</script>