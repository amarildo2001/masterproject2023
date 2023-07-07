# masterproject2023

Participants in the project: Amarildo Prendi, Isarda Kuci

db name: mastrproject
db username: amarildoprendi
db password: rildo123
host: localhost
port: 5432

Following the instructions in the project documetation we did these steps:

Design the Database Schema:

We have designed the PostgreSQL database schema to include tables for users, reports, and other related entities.
We have defined the relationships between tables, such as the user and report relationships.
Set up the Node.js + Express Backend:

We have initialized a new Node.js project.
We have set up an Express server to handle HTTP requests.
The server is configured to use JWT authentication with the HS256 algorithm.
We have implemented routes and controllers to handle user authentication, report management, and statistics retrieval.

Implement User Management:
We have created endpoints for user registration, login, and authentication using JWT.
User authorization has been implemented to differentiate between admin and regular users.
Functionality has been added to create, delete, and retrieve user details for admin users.

Implement Report Management:
Endpoints have been created for creating, updating, and deleting reports.
Logic has been implemented to extract user details from the JWT token or server and associate them with the reports.

Implement Admin Functions:
We have created endpoints for admin-specific operations such as approving, rejecting, and deleting reports.
We have implemented statistics endpoints to retrieve lists of users with the highest number of reports, approved reports, and rejected reports.

Integrate OpenWeatherMap API 
We have implemented functionality to retrieve the nearest city from OpenWeatherMap using the provided geographical coordinates.
An endpoint has been created to retrieve the list of reports within a 30km radius around a specific location.
Dockerize the Application:

We have set up Docker containers for the PostgreSQL database and the Node.js + Express backend.
Docker Compose is used to manage the containers and their dependencies.
