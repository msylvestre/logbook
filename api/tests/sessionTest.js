var bodyParser = require('body-parser');
var request    = require('request');
var dateFormat = require('date-format');
var chai       = require('chai');
var chaiHttp   = require('chai-http');
var should     = chai.should();
var konsole    = require('../lib/konsole.js');
var newSessionId;

chai.use(chaiHttp);


//==============================================================================
describe('API /sessions', function() {

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


  it('should get a statusCode 200 when getting a session list', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/1/sessions')
        .end((err, res) => {
          res.body.msg.should.be.eql("getSessionsListSuccess");
          res.body.payload.length.should.be.eql(2);
          res.should.have.status(200);
          done();
        });
  });


  it('should get a statusCode 200 when getting a session', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/1/sessions/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.msg.should.be.eql("getSessionSuccess");
          res.body.payload.info.track.should.be.eql("St-Eustache");
          res.body.payload.info.weather.track.should.be.eql("DRY");
          res.body.payload.info.timing.bestTime.id.should.be.eql("2");
          done();
        });
  });


  it('should get a statusCode 404 when getting a session that doesn\'t exist', (done) => {

    chai.request('http://localhost:8081')
        .get('/api/users/1/sessions/0')
        .end((err, res) => {
          res.should.have.status(404);
          res.body.msg.should.be.eql("getSessionFail");
          done();
        });
  });


  xit('should get a statusCode 200 when updating a session', (done) => {
  });


  xit('should get a statusCode 404 when trying to update a session thats not found', (done) => {
  });


  it('should get a statusCode 200 when exact search return 1 result', (done) => {

    var params = { criteria: 'track', value: 'Icar' };

    chai.request('http://localhost:8081')
        .post('/api/users/1/sessions/search')
        .send(params) 
        .end((err, res) => {
          res.body.msg.should.be.eql("searchSessionSuccess");
          res.should.have.status(200);
          newSessionId = res.body.payload[0].id;
          done();
        });
  });


  it('should get a statusCode 200 when deleting a session', (done) => {

    chai.request('http://localhost:8081')
        .delete('/api/users/1/sessions/' + newSessionId)
        .end((err, res) => {
          res.body.msg.should.be.eql("deleteSessionSuccess");
          res.should.have.status(200);
          done();
        });
   
  });

  it('should get a statusCode 404 when the session to be deleted doesn\'t exist', (done) => {

    chai.request('http://localhost:8081')
        .delete('/api/users/1/sessions/0')
        .end((err, res) => {
          res.body.msg.should.be.eql("deleteSessionFail");
          res.should.have.status(404);
          done();
        });

  });

});