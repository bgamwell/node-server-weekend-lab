var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    _ = require("underscore"),
    mongoose = require('mongoose'),
    Post = require('./models/post');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/blogposts'); // specifies that we're working with the post server

// Setting up all routes

app.get('/', function (req, res) { // root, serves index.html as the homepage
  res.sendFile(__dirname + '/public/views/index.html');
});


app.get('/api/posts', function (req, res) {
  Post.find(function (err, posts) {
    res.json(posts);
    // res.send("The server is working!");
  });
});


app.get('/api/posts/:id', function (req, res) { //get request for a specific post
  var targetPost = req.params.id;

  //finding one post within the schema and responding with a json object of the targetPost
  Post.findOne( { _id: targetPost }, function(err, targetPost) {
    res.json(targetPost);
  });
});


app.post('/api/posts', function (req, res) { //post a new blog post

  // grab params (word and definition) from form data
  var newPost = new Post({
    title: req.body.title, // data that is returned in a request -- all data has a header and a body -- google http request structure
    body: req.body.body
  });

  console.log(req.body);

  // Save newPost to the mongodb
  newPost.save(function (err, savedPhrase) {
    res.json(savedPhrase);
  });
});


app.put('/api/posts/:id', function (req, res) { //update an existing blog post
  // set the value of the id
 var targetPost = req.params.id; // I'm not sure how to grab the ID here

 // find item in `phrases` array matching the id
 Post.findOne( { _id: targetPost }, function(err, targetPost) {
   //update the post title and body
   targetPost.title = req.body.title;
   targetPost.body = req.body.body;

  // save the new post
   targetPost.save(function (err, savedPost) {
      res.json(savedPost);
    });
  });
 });


app.delete('/api/posts/:id', function (req, res) { //delete a blog post by ID
  var targetPost = req.params.id;

  // find item in the db and delete it
  Post.findOneAndRemove({_id: targetPost}, function (err, deletedPost) {
    res.json(deletedPost);
  });
});


app.listen(3000, function() {
  console.log('server started on localhost:3000');
});
