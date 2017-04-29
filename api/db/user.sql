DROP TABLE logbook_user;

CREATE TABLE logbook_user (
 id serial NOT NULL PRIMARY KEY,
 info json NOT NULL
);

INSERT INTO logbook_user (info) VALUES (
    '{"firstname":"test","lastname":"user","email":"test_user@racinglogbook.com","password":"123456789q","role":"COACH",
      "car" : {"Brand":"Subaru","Model":"STI","Year":"2009","Color":"White","Drivetrain":"AWD"}}'
  );

SELECT info -> 'email' AS email FROM logbook_user;

SELECT * FROM logbook_user;



