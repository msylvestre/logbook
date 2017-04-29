var bodyParser = require('body-parser');
var request    = require('request');
var chai       = require('chai');
var chaiHttp   = require('chai-http');
var should     = chai.should();
var newUserId;

chai.use(chaiHttp);

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
 

  it('should get a statusCode 200 when login is successful', (done) => {

    var params = {
      email:'test_user@racinglogbook.com', 
      password:'123456789q'
    };

    chai.request('http://localhost:8081')
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("loginSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 404 when login fail', (done) => {

    var params = {
      email:'fail@racinglogbook.com', 
      password:'123456789q'
    };

    chai.request('http://localhost:8081')
        .post('/api/users/login')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("loginFail");
          res.should.have.status(404);
          done();
        });
  });


  it('should get a statusCode 200 when a user is created successfully', (done) => {

    var params = {
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
    };


    chai.request('http://localhost:8081')
        .post('/api/users')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("createUserSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 200 when search a user return at least 1 result', (done) => {

    var params = { email:'fuel@racinglogbook.com' };

    chai.request('http://localhost:8081')
        .post('/api/users/search')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("searchSuccess");
          res.should.have.status(200);
          newUserId = res.body.payload[0].id;
          done();
        });
  });


  it('should get a statusCode 404 when search a user return no result', (done) => {

    var params = {email:'fail_user@racinglogbook.com'};

    chai.request('http://localhost:8081')
        .post('/api/users/search')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("searchFail");
          res.should.have.status(404);
          done();
        });
  });


  it('should get a statusCode 200 when getting the user list', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users')
        .end((err, res) => {
          res.body.msg.should.be.eql("getListSuccess");
          res.body.payload.length.should.be.eql(2);
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 200 when updating a user is successful', (done) => {

    var params = {
      firstname:     "Racing",
      lastname:      "Fuel",
      email:         "fuel@racinglogbook.com",
      password:      "123456789q",
      role:          "driver",
      carBrand:      "Scion",
      carModel:      "FRS",
      carYear:       "2016",
      carColor:      "Blue",
      carDrivetrain: "RWD"
    };


    chai.request('http://localhost:8081')
        .put('/api/users/' + newUserId)
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("updateUserSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 404 when trying to update a user thats not found', (done) => {

    var params = {
      firstname:     "Racing",
      lastname:      "Fuel",
      email:         "fuel@racinglogbook.com",
      password:      "123456789q",
      role:          "driver",
      carBrand:      "Scion",
      carModel:      "FRS",
      carYear:       "2016",
      carColor:      "Blue",
      carDrivetrain: "RWD"
    };


    chai.request('http://localhost:8081')
        .put('/api/users/0')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("updateUserFail");
          res.should.have.status(404);
          done();
        });
  });


  it('should get a statusCode 200 when getting a user', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/1')
        .end((err, res) => {
          res.body.msg.should.be.eql("getUserSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 404 when getting a user that doesn\'t exist', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/0')
        .end((err, res) => {
          res.body.msg.should.be.eql("getUserFail");
          res.should.have.status(404);
          done();
        });
  });


  it('should get a statusCode 200 when a user is deleted', (done) => {

    chai.request('http://localhost:8081')
        .delete('/api/users/' + newUserId)
        .end((err, res) => {
          res.body.msg.should.be.eql("deleteSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 404 when the user to be deleted doesn\'t exist', (done) => {

    chai.request('http://localhost:8081')
        .delete('/api/users/0')
        .end((err, res) => {
          res.body.msg.should.be.eql("deleteFail");
          res.should.have.status(404);
          done();
        });
  });


});
