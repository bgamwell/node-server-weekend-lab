var request = require('request');
var expect = require('chai').expect;
var cheerio = require('cheerio');

var baseUrl = 'http://localhost:3000';

// DESCRIBE WHAT WE ARE TESTING
  // SAY WHAT BEHAVIOR 'IT' AUGHT TO HAVE
    // SEND THE REQUEST
      // USE CHAI-EXPECT TO EXPECT THE STATUS RESULT
      // CHECK FALSE VALUE TO SEE IF WE CAN MAKE TEST FAIL
      // CALL DONE();

describe(baseUrl, function() {
  it('The homepage title should contain Blogly', function(done) {
    request(baseUrl, function(err, res, body) {
      var $ = cheerio.load(body);
      var title = $('title').text();
      expect(title).to.contain('Blogly');
      done();
    });
  });
});

// Write a test to see what happens when a button is clicked

// Write a test to check for a 200 response

// Write a test for the delete route (not currently working)
