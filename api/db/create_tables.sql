DROP TABLE logbook_user;
DROP TABLE session;

CREATE TABLE logbook_user (
 id serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);

INSERT INTO logbook_user (info) VALUES (
  '{"firstname":"Test","lastname":"User","email":"test_user@racinglogbook.com","password":"123456789q","role":"COACH",
    "cars" : [ {"brand":"Pontiac","model":"Chevette","year":"1984","color":"Beige","drivetrain":"RWD"} ],
    "experience" : {"type" : "CAR_ROAD_RACE", "tracks" : [ {"trackName" : "ICAR"} ], "nbSession" : "20+", "nbYear" : "5+", "note" : null}}'
);


SELECT info -> 'email' AS email FROM logbook_user;

SELECT * FROM logbook_user;

SELECT id, info FROM logbook_user WHERE info ->> 'email' like '%fuel%';

------------------------------------------------------------

CREATE TABLE session (
 id serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);


INSERT INTO session (info) VALUES (
 '{"sessionDate" : "2017-04-30 09:00 GMT-4", "track":"Icar"}'
);

