var bodyParser = require('body-parser');
var http       = require('http');


var options = {
   host: '127.0.0.1',
   port: '8081',
   path: '/api/users/login?username=msylvestr&password=123456789q',
   method: 'GET'  
};

// Callback function is used to deal with response
var callback = function(response){

   var body = '';

   // Listener on "data" event. Continuously update stream with data
   response.on('data', function(data) {
      body += data;
   });
   
   // Listener on "end" event.  Time to render the page
   response.on('end', function() {
      
      console.log('body: ' + body);

   });
};

// Make a request to the API server
var reqToApi = http.request(options, callback);
reqToApi.end();