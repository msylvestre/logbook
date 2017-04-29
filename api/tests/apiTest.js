var bodyParser = require('body-parser');
var request    = require('request');

//Require the dev-dependencies
var chai       = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var expect     = chai.expect; // we are using the "expect" style of Chai

chai.use(chaiHttp);


var loginParam = {
  form: {
    email:'marco@venzee.com', 
    password:'123456789q'
  }
};

var userCreate = {
  form: {
    firstname:     "Racing",
    lastname:      "Fuel",
    email:         "fuel@racinglogbook.com",
    password:      "123456789q",
    role:          "COACH",
    carBrand:      "Subaru",
    carModel:      "STI",
    carYear:       "2009",
    carColor:      "White",
    carDrivetrain: "AWD"
  }
};

var userUpdate = {
  form: {
    firstname:     "Racing",
    lastname:      "Fuel",
    email:         "fuel@racinglogbook.com",
    password:      "123456789q",
    role:          "COACH",
    carBrand:      "Scion",
    carModel:      "FRS",
    carYear:       "2016",
    carColor:      "Blue",
    carDrivetrain: "RWD"
  }
};


describe('API /users', function() {

  it('should get a statusCode 200 when reaching on /api/ if the API is up', (done) => {

    chai.request('http://localhost:8081')
        .get('/api')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
  });

});

/*
describe('API users', function() {

  it('Get on /api/ should return a code 200 if the API is up', function() {

    request.get('http://127.0.0.1:8081/api/', function(err, response, body) {
      //console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
      //console.dir(JSON.parse(body), {depth: null, colors: true}) // Print the HTML for the Google homepage. 
    
      //console.log("body:" + body);
      //console.log("SC: " + response.statusCode)
      expect(body).to.equal("You reached /api2/");

      expect(400).to.equal(200);

    });

  });

});
*/

/*
request.post('http://127.0.0.1:8081/api/users/login', loginParam, function(err, response, body) {
  console.log("\n\n-------------- TEST #1 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true}) // Print the HTML for the Google homepage. 
});


request.post('http://127.0.0.1:8081/api/users', userCreate, function(err, response, body) {
  console.log("\n\n-------------- TEST #2 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true}); // Print the HTML for the Google homepage. 
});


request.get('http://127.0.0.1:8081/api/users', function(err, response, body) {
  console.log("\n\n-------------- TEST #3 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true});

});

request.delete('http://127.0.0.1:8081/api/users/3', function(err, response, body) {
  console.log("\n\n-------------- TEST #4 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true});

});


request.get('http://127.0.0.1:8081/api/users/9', function(err, response, body) {
  console.log("\n\n-------------- TEST #5 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true});

});


request.put('http://127.0.0.1:8081/api/users/5', userUpdate, function(err, response, body) {
  console.log("\n\n-------------- TEST #2 --------------")
  console.log('error:', err); // Print the error if one occurred 
  console.log('statusCode:', response.statusCode); // Print the response status code if a response was received 
  console.dir(JSON.parse(body), {depth: null, colors: true}); // Print the HTML for the Google homepage. 
});
*/