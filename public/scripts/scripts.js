$(document).ready(function() {

  console.log('$'); // JQUERY IS WORKING!
  console.log('_'); // UNDERSCORE IS WORKING!
  console.log('Ready to code!');

  var $addNew = $("#add-new"); // selects the "Add New" button in the DOM

  var $newPostForm = $('#new-post-submit-form');

  var postID; // play around with data ID's and assignment - they may be affecting the modal functionality

  $addNew.on('click', function(){
    var $title = $('#title-input').val();
    var $body = $('#body-input').val();
    var newPost = {title: $title, body: $body};

     // send POST request to server to create new phrase
     $.ajax({
  		type: "POST",
  		url: "http://localhost:3000/api/posts",
  		data: newPost,
  		success: function() {
  			window.location.reload();
  		},
  		error: function() {
  			alert("Error!");
  		}
	   });
  });

  // Use templating to render blog posts to the view at index.html
  $.ajax({
  		url: "/api/posts",
  		type: "GET",
  		success: function(post) {
  			var template = _.template($("#posts-template").html()); // this commands to render the script as html

  			_.each(post, function(post) {
  				$("#new-blog-posts-rendered-here").append(template(post)); // this should be the id of where the template is appended
  			});
  		}
  	});

    // Show modal when clicking edit button, $document ensures that we're looking at the current state of the DOM, not the DOM on load

    $(document).on("click", ".edit-button", function(event) {
  	event.preventDefault();

    	$.ajax({
    		url: "http://localhost:3000/api/posts/" + $(this).data("id"),
    		type: "GET",
    		success: function(data) {
    			$("#edit-title").val(data.title);
    			$("#edit-body").val(data.body);

    			$("#edit-post-modal").modal("show");
    		}
    	});

    var postID = $(this).data("id");

  });

  // Submit a post

  $('#submit-post').on('click', function(){
    var updatedPost = {title: $('#edit-title').val(), body: $('#edit-body').val()};

    $.ajax({
      url: 'http://localhost:3000/api/posts/' + postID,
      type: 'PUT',
      data: updatedPost,
      success: function(data) {
        $("#edit-post-modal").modal("hide");
        window.location.reload();
      }
    });
  });

  // Delete a post
  // Won't work more than one time

  $('#delete-a-post').on('click', function(){

    $.ajax({
      url: 'http://localhost:3000/api/posts/' + $(this).data('id'), // there's no get request first, so how does ajax know what the id is?
      type: 'DELETE',
      success: function() {
        $("#edit-post-modal").modal("hide");
        window.location.reload();
      }
    });
  });

});
