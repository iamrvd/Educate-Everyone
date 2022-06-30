//added this in, not in express template, required by mongoose

var mongoose = require('mongoose');

var VideoSchema = new mongoose.Schema({
    videotitle: String,
    description: String,
    category: String,
    videourl: String,
    author: String
});

module.exports = mongoose.model('Video', VideoSchema);