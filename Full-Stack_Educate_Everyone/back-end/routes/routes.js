var express = require('express');
var path = require('path'); //had to add
var router = express.Router();

var mongoose = require('mongoose');
var Video = require('../models/Video.js');
var Quiz = require('../models/Quiz.js');

//Authentication
var User = require("../models/User");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var auth = require("../middleware/auth");

//Auth Routes
router.get('/register', function(req, res, next) {
  res.render('register', { });
});


router.post("/register", async function(req, res, next) {
  try {
    // raw user input from form
    var fname = req.body.fname;
    var lname = req.body.lname;
    var username = req.body.username;
    var password = req.body.password;
    var userRole = req.body.userRole;

    //check for an existing user with this username before creating a new one
    var oldUser = await User.findOne({ username });
    if (oldUser) {
      return res.send("User Already Exists. Please Login instead.");
    }

//If there is no existing user with that username:

    //Encrypt the plain-text password
    encryptedPassword = await bcrypt.hash(password, 10);

     // Create a new user in database
     const user = await User.create({
      fname,
      lname,
      username,
      password: encryptedPassword, //to ensure no plain-text password saved
      userRole 
    });

    // Create signed token
    var token = jwt.sign(
      { user_id: user._id, username },
      'WoolyHamFingers',
      {
        expiresIn: "2h",
      }
    );
    // save user token to user object in memory
    user.token = token;

    // return new user as JSON
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }

});


router.get('/login', function(req, res, next) {
  res.render('login', { });
});


router.post("/login", async function(req, res, next) {
  try {
    // raw user input from login form
    var { username, password } = req.body;

    // Validate that both username and password are provided
    if (!(username && password)) {
      res.status(400).send("Username and password both required.");
    }
    // return the user from the local database
    var user = await User.findOne({ username });

    //bcrypt encrypts the raw password from login and compares the hashed version
    //with the one saved in the database
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      var token = jwt.sign(
        { user_id: user._id, username },
        'WoolyHamFingers',
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;

      // return the user as JSON
      res.status(200).json(user);
    }
    //res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

// 'auth' is a separate middleware that checks for a valid signed token in the header
// of the request. This protects this specific route.
router.get("/welcome", auth, function(req, res, next) {
  res.send("Welcome to the secret stuff.");
});


//App Routes
router.get('/api/videos', function(req, res, next){
    Video.find(function(err, videos){
        if (err) return next(err);
        res.json(videos);
    })
});

router.get('/api/videos/:id', function(req, res, next){
  Video.findById(req.params.id, function(err, videos){
      if(err) return next(err);
      res.json(videos);
  });
});

router.post('/api/courses/new', function(req, res, next) {
    Video.create(req.body,function (err, videos) {
      if (err) return next(err);
      res.json(videos);
    });
  });

router.get('/api/quizzes', function(req, res, next){
    Quiz.find(function(err, quizzes){
        if (err) return next(err);
        res.json(quizzes);
    })
});

router.get('/api/quizzes/:id', function(req, res, next){
    Quiz.findById(req.params.id, function(err, quizzes){
        if(err) return next(err);
        res.json(quizzes);
    });
});

router.post('/api/quizzes/new', function(req, res, next) {
    Quiz.create(req.body,function (err, quizzes) {
      if (err) return next(err);
      res.json(quizzes);
    });
  });

// router.delete('/api/videos/delete/:id', function(req, res, next) {
//     Video.findByIdAndRemove(req.params.id, req.body, function (err, videos) {
//       if (err) return next(err);
//       res.json(videos);
//     });
//   });

router.delete('/api/videos/delete/:id', async function(req, res, next) {
      const id = req.params.id
      try{
        const result = await Video.findByIdAndDelete(id);
        res.send(result);
      }catch (error){
        console.log(error.message);
      }
});

router.put('/api/videos/edit/:id', function(req, res, next) {
  Video.findByIdAndUpdate(req.params.id, req.body, function (err, videos) {
    if (err) return next(err);
    res.json(videos);
  });
});

module.exports = router;