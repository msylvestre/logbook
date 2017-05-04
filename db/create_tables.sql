DROP TABLE logbook_user;
DROP TABLE session;

CREATE TABLE logbook_user (
 id serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);

INSERT INTO logbook_user (info) VALUES (
  '{"firstname":"Test","lastname":"User","email":"test_user@racinglogbook.com","password":"123456789q","role":"COACH",
    "cars" : [ {"brand":"Pontiac","model":"Chevette","year":"1984","color":"Beige","drivetrain":"RWD"} ],
    "experience" : {"type" : "CAR_ROAD_RACE", "tracks" : [ {"trackName" : "Icar"} ], "nbSession" : "20+", "nbYear" : "5+", "note" : null}}'
);


SELECT info -> 'email' AS email FROM logbook_user;
SELECT id, info FROM logbook_user WHERE info ->> 'email' like '%fuel%';

SELECT * FROM logbook_user;


------------------------------------------------------------

CREATE TABLE session (
 id serial NOT NULL PRIMARY KEY,
 user_id integer NOT NULL,
 info json NOT NULL
);


INSERT INTO session (user_id, info) VALUES (1,
 '{"sessionDate":"2017-04-30 09:00","track":"St-Eustache","group":"GREEN","length":20,"sessionType":"LAPPING_SOLO",
   "weather":{"track":"DRY","sky":"OVERCAST","temperature":9},
   "evaluation":{"driverPosition":5,"flagKnowledge":5,"blendLineRespect":5,"carControl":5,"vision360":5,"passing":5, "braking":5,"shifting":5,
                 "trackLine":5,"pitOut":5,"promotionRecommended":"NO","promotedGroup":"","overallScore":5,"coachId":1,"coachName":"Test User", "note": ""},
   "timing" : {
        "bestTime" : {"id" : "2","lapTime" : "1:50"},
        "time" : [ {"id" : 1, "lapTime" : "2.02"}, {"id" : 2, "lapTime" : "1:50"} ] },
   "note" : "Senna as an inspiration.",
   "createdDate" : "2017-05-01 23:59:00",
   "updatedDate" : "2017-05-02 10:00:00"}'
);

SELECT * FROM session;