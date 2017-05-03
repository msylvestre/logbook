var bodyParser = require('body-parser');
var request    = require('request');
var dateFormat = require('date-format');
var chai       = require('chai');
var chaiHttp   = require('chai-http');
var should     = chai.should();
var konsole    = require('../lib/konsole.js');
var newUserId;

chai.use(chaiHttp);


//==============================================================================
describe('API /', function() {

  it('should get a statusCode 200 when reaching on /api/ if the API is up', (done) => {

    chai.request('http://localhost:8081')
        .get('/api')
        .end((err, res) => {
            res.should.have.status(200);
          done();
        });
  });

});


//==============================================================================
describe('API /users', function() {

  it('should get a statusCode 200 when login is successful', (done) => {

    var params = {
      email:'test_user@racinglogbook.com', 
      password:'123456789q'
    };

    chai.request('http://localhost:8081')
        .post('/api/users/login')
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
      cars : [
        {
          brand:      "Subaru",
          model:      "STI",
          year:       "2009",
          color:      "White",
          drivetrain: "AWD"
        }
      ],
      experience : {
        type : "CAR_ROAD_RACE",
        tracks : [
          {
            trackName : "ICAR"
          }
        ],
        nbSession : "20+",
        nbYear : "5+",
        note : null
      }
    };

    chai.request('http://localhost:8081')
        .post('/api/users')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("createUserSuccess");
          res.body.payload.firstname.should.be.eql("Racing");
          //res.body.payload.car.brand.should.be.eql("Subaru");
          res.body.payload.cars[0].brand.should.be.eql("Subaru");
          res.body.payload.experience.type.should.be.eql("CAR_ROAD_RACE");
          res.body.payload.experience.tracks[0].trackName.should.be.eql("ICAR");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 200 when exact search return 1 result', (done) => {

    var params = { email:'fuel@racinglogbook.com' };

    chai.request('http://localhost:8081')
        .post('/api/users/search')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("searchSuccess");
          res.should.have.status(200);
          newUserId = res.body.payload[0].id;
          done();
        });
  });


  it('should get a statusCode 200 when search a user return at least 1 result', (done) => {

    var params = { email:'%fuel%' };

    chai.request('http://localhost:8081')
        .post('/api/users/search')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("searchSuccess");
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 404 when search a user return no result', (done) => {

    var params = {email:'fail_user@racinglogbook.com'};

    chai.request('http://localhost:8081')
        .post('/api/users/search')
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


  it('should get a statusCode 200 when getting a user', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.be.eql("getUserSuccess");
          res.body.payload.info.firstname.should.be.eql("Test");
          res.body.payload.info.cars[0].brand.should.be.eql("Pontiac");
          res.body.payload.info.experience.type.should.be.eql("CAR_ROAD_RACE");
          res.body.payload.info.experience.tracks[0].trackName.should.be.eql("ICAR");

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


  it('should get a statusCode 200 when updating a user is successful', (done) => {

    var params = {
      firstname:     "Racing",
      lastname:      "Fuel",
      email:         "fuel@racinglogbook.com",
      password:      "123456789q",
      role:          "DRIVER",
      cars : [
        {
          brand:      "Scion",
          model:      "FRS",
          year:       "2016",
          color:      "Blue",
          drivetrain: "RWD"
        }
      ],
      experience : {
        type : "KART",
        tracks : [
          {
            trackName : "ICAR"
          }
        ],
        nbSession : "20+",
        nbYear : "5+",
        note : null
      }
    };

    chai.request('http://localhost:8081')
        .put('/api/users/' + newUserId)
        .send(params) 
        .end((err, res) => {
          //konsole.log(newUserId);
          //konsole.dir(JSON.stringify(res.body));
          res.should.have.status(200);
          res.body.msg.should.be.eql("updateUserSuccess");
          res.body.payload.firstname.should.be.eql("Racing");
          res.body.payload.role.should.be.eql("DRIVER");
          res.body.payload.cars[0].brand.should.be.eql("Scion");
          res.body.payload.experience.type.should.be.eql("KART");
          res.body.payload.experience.tracks[0].trackName.should.be.eql("ICAR");
          done();
        });
  });


  it('should get a statusCode 404 when trying to update a user thats not found', (done) => {

    var params = {
      firstname:     "Racing",
      lastname:      "Fuel",
      email:         "fuel@racinglogbook.com",
      password:      "123456789q",
      role:          "DRIVER",
      car : [
        {
          brand:      "CADILLAC",
          model:      "CTS-V",
          year:       "2016",
          color:      "BLACK",
          drivetrain: "RWD"
        }
      ],
      experience : {
        type : "CAR_ROAD_RACE",
        tracks : [
          {
            trackName : "Icar"
          }
        ],
        nbSession : "20+",
        nbYear : "5+",
        note : null
      }
    };


    chai.request('http://localhost:8081')
        .put('/api/users/0')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("updateUserFail");
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


//==============================================================================
describe('API /session', function() {

  it('should get a statusCode 200 when a session is created successfully', (done) => {

    var params = {
      sessionDate:  "2017-04-30 09:00",
      track:        "Icar",
      group :       "GREEN",
      length :      20,
      sessionType : "LAPPING_SOLO", 
      weather : {
        track       : "DRY",
        sky         : "OVERCAST",
        temperature : 9
      },
      evaluation : {
        driverPosition : 5,
        flagKnowledge : 5,
        blendLineRespect : 5,
        carControl : 5,
        vision360 : 5,
        passing : 5,
        braking : 5,
        shifting : 5,
        trackLine : 5,
        pitOut : 5,
        promotionRecommended : "NO",
        promotedGroup : "INSTRUCTOR",
        overallScore : 5,
        coachId : 1,
        coachName : "Test User",
        note : "Very good student!" 
      },
      timing : {
        bestTime : {
          id : 2,
          lapTime : "1:50"
        },
        time : [
          {
             id : 1,
             lapTime : "2.02",
          },
          {
             id : 2,
             lapTime : "1:50",
          }         
        ],
      },
      note : "Senna as an inspiration.",
      createdDate : "2017-05-01 23:59:00",
      updatedDate : dateFormat('yyyy-MM-dd hh:mm:ss', new Date())
    };


    chai.request('http://localhost:8081')
        .post('/api/users/1/sessions')
        .send(params) 
        .end((err, res) => {
          //konsole.dir(JSON.stringify(res.body));
          res.body.msg.should.be.eql('addSessionSuccess');
          res.should.have.status(200);
          done();
        });
  });

  xit('should get a statusCode 200 when getting a session list', (done) => {
  });

  xit('should get a statusCode 200 when getting a session', (done) => {
  });

  xit('should get a statusCode 404 when getting a session that doesn\'t exist', (done) => {
  });

  xit('should get a statusCode 200 when updating a session', (done) => {
  });

  xit('should get a statusCode 404 when trying to update a session thats not found', (done) => {
  });

  xit('should get a statusCode 200 when deleting a session', (done) => {
  });

  xit('should get a statusCode 404 when the session to be deleted doesn\'t exist', (done) => {
  });

});