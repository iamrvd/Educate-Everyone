//added this in, not in express template, required by mongoose

var mongoose = require('mongoose');

var QuizSchema = new mongoose.Schema({
    quizTitle: String,
    category: String,
    quizContent: [{ 
        question: String, 
        correct_answer: String,
        incorrect_answer: [{type: String}] 
    }]
});

module.exports = mongoose.model('Quiz', QuizSchema);