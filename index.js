var express = require('express'),
    app = express();
    bodyParser = require('body-parser');
    _ = require("underscore");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// This is our simulated database
var posts = [
  {
    id: 1,
    title: 'Hello, World!',
    body: 'This is a really cool sample blog post!'
  },
  {
    id: 2,
    title: 'A Simple Guide to Node.js',
    body: 'You can learn more on my website!'
  },
  {
    id: 3,
    title: 'How to Set Up a Simple Website Project',
    body: 'Learn more by going to my GitHub repo!'
  }
];

// Setting up all routes

app.get('/', function (req, res) { // root, serves index.html as the homepage
  res.sendFile(__dirname + '/public/views/index.html');
});

app.get('/api/posts', function (req, res) { //get request for the posts API
  res.json(posts); //body-parser allows us to format the server response as JSON
});

app.get('/api/posts/:id', function (req, res) { //get request for a specific post
  var targetPost = parseInt(req.params.id); //parseInt turns the ID string from the URL into an integer id
  var foundPost = _.findWhere(posts, { id: targetPost });
  res.json(foundPost);
});

app.post('/api/posts', function (req, res) { //post a new blog post
  // grab params (word and definition) from form data
  var newPost = req.body;

  // set sequential id (last id in `phrases` array + 1)
  if (posts.length > 0) {
    newPost.id = posts[posts.length - 1].id +  1;
  } else {
    newPost.id = 0;
  }

  // add newPhrase to `phrases` array
  posts.push(newPost);

  // send newPhrase as JSON response
  res.json(newPost);

});

app.put('/api/posts/:id', function (req, res) { //update an existing blog post
  // set the value of the id
 var targetPost = parseInt(req.params.id);

 // find item in `phrases` array matching the id
 var foundPost = _.findWhere(posts, { id: targetPost });

 // update the phrase's word
 foundPost.title = req.body.title;

 // update the phrase's definition
 foundPost.body = req.body.body;

 // send back edited object
 res.json(foundPost);

});

app.delete('/api/posts/:id', function (req, res) { //delete a blog post by ID
  var targetPost = parseInt(req.params.id);
  var foundPost = _.findWhere(posts, { id: targetPost });

  var index = posts.indexOf(foundPost);

  posts.splice(index, 1);

  res.json(foundPost);
});

app.listen(3000, function() {
  console.log('server started on localhost:3000');
});
