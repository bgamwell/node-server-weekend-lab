$(document).ready(function() {

  console.log('$'); // JQUERY IS WORKING!
  console.log('_'); // UNDERSCORE IS WORKING!
  console.log('Ready to code!');

  var $addNew = $("#add-new"); // selects the "Add New" button in the DOM

  var $newPostForm = $('#new-post-submit-form');

  var postID = 1;

  $addNew.on('click', function(){
    var $title = $('#title-input').val();
    var $body = $('#body-input').val();
    var newPost = {title: $title, body: $body};

    console.log("form submitted");

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

        // var $editButton = $('.edit-button');
        //
        // $editButton.each( function() { // we have to loop through the edit buttons AFTER the AJAX request; otherwise, there's nothing to select in the DOM
        //   $(this).on('click', function() {
        //     alert("You clicked an edit button!");
        //   });
        // });

  		}
  	});

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

  // Delete a post -- not working and no idea why; I can't select the Delete button within the DOM

  $('#delete-a-post').on('click', function() {
    alert("Thanks for clicking!");
  });

  $('#delete-a-post').on('click', function(){
    alert("You clicked the delete button!");

    $.ajax({
      url: 'http://localhost:3000/api/posts/' + postID,
      type: 'DELETE',
      success: function() {
        $("#edit-post-modal").modal("hide");
        window.location.reload();
      }
    });
  });



  });


});