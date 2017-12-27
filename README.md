## Racing logbook

### Description
This is the Wiki that contain all the documentation about the system racinglogbook.net

### General Architecture

- Web Site
- Mobile App
- API
- Database


<INSERT PICS HERE>


## API Documentation

### General

- The api can be reached at api.racinglogbook.com.  The QA pendant is reachable at qa-api.racinglogbook.net.
- The version of the API - currently v1 - is embedded in each call Ex: api.racinglogbook.net/v1/login
- The authentication is done via a basic token pass as a query parameter.  Ask the admin for your token.


### Ressource

There's currently 4 differemnt ressource available in the v1 of the API.

Admin : Hidden ressource.  Currently use to reset password only.
Users : Represent the drivers & instructors.
Sessions : Represent a "lapping session" on a specific time, on a specifc place.
Tracks : Represent the tracks where we're having events.


### Root

`GET /` : Simply return "You reached /api/".  


### Admin

`GET /admin/setPassword?userId=xxx&pwd=xxx&token=xxx` : Hidden endpoint used by the admin to set / reset password of user account.  Require a secret security token. 


### Users

`POST /users/login` : Use to login as a user via the mobile app (could be use for web app later).

`POST /users` : Create a new user.  The users info is pass via a body param.

`POST /users/search` : Search users. You pass the "criteria" & "value" in a body parameter (Ex: {criteria:email, value:marco@logbook.com} ).

`PUT /users/:id` : Update a user. The users info is pass via a body param.

`GET /users` : Get th elist of all users (driver & instructors).

`GET /users/:id` : Get a specific user by its id.

`DELETE /users/:id` : Delete a specific user.

`GET /users/:id/trackStats` : Get the track statisic from a user (which track he ran, when)

`GET /users/:id/globalStats` : Get the global stats for a user (nb of hours/km done on track).


### Sessions

`POST /users/:userId/sessions` : Create a new session. The session info is pass via a body param.

`GET /users/:userId/sessions` : Get all the session for a user.

`GET /users/:userId/sessions/:id` : Get a specific session for a user.

`POST /users/:userId/sessions/search` : Search a session. You pass the "criteria" & "value" in a body parameter (Ex: {criteria:track, value:ICAR} ).

`PUT /users/:id/sessions/:id` : Update a session for a user. The session info is pass via a body param.

`DELETE /users/:id/sessions/:id` : Delete a session for a user.



### Tracks

`GET /tracks` : Return the list of tracks.

`GET /tracks/:id` : Return a track by its id.


## Future Development

HIGH
- Need to change `api.racinglogbook.net/api` to `api.racinglogbook.net/v1`
- Need to add the Securuty Token on each calls
- Implement Passport for session management

LOW
- Refactor `GET /admin/setPassword` to become a `POST`
- The Sessions ressource should be uncoupled from the users (best practice)

