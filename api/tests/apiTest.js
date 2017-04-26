var bodyParser = require('body-parser');
var request    = require('request');



request('http://127.0.0.1:8081/api/users/login?username=msylvestr&password=123456789q', function (error, response, body) {

  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});