DROP TABLE logbook_user;

CREATE TABLE logbook_user (
 id serial NOT NULL PRIMARY KEY,
 email text NOT NULL,
 password text NOT NULL,
 info json NULL
);

INSERT INTO logbook_user (email, password, info) VALUES (
  'marco@venzee.com',
  '123456789q',
  '{"email":"marco@venzee.com", "password":"123456789q"}'
);

SELECT * FROM logbook_user;

SELECT info -> 'email' AS email FROM logbook_user;