<template>
  <div id="quiz-container">
    <h1 id="logo-headline">headsUP</h1>
    <!-- div#correctAnswers -->
    <hr class="divider" />
    <div>
      <h1 v-html="loading ? 'Loading...' : currentQuestion.question"></h1>
      <form v-if="currentQuestion">
        <button
          v-for="answer in currentQuestion.answers"
          :index="currentQuestion.key"
          :key="answer"
          v-html="answer"
          @click.prevent="handleButtonClick"
        ></button>
      </form>
      <hr class="divider" />
    </div>
  </div>
</template>

<script>
    
  export default {
    name: 'Quiz',
    data() {
      return {
        questions: [],
        loading: true,
        index: 0
      };
    },
    computed: {
      currentQuestion() {
        if (this.questions !== []) {
          return this.questions[this.index];
        }
        return null;
      }
    },
    methods: {
      async fetchQuestions() {
        this.loading = true;
        let response = await fetch(
          'https://opentdb.com/api.php?amount=10&category=9'
        );
        let jsonResponse = await response.json();
        let data = jsonResponse.results.map((question) => {
          // put answers on question into single array
          question.answers = [
            question.correct_answer,
            ...question.incorrect_answers
          ];
          return question;
        });
        console.log(data);
        this.questions = data;
        this.loading = false;
      }
    },
    mounted() {
      this.fetchQuestions();
    }
  };

</script>