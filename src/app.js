const express = require('express');
// The above line imports the Express library, which is a popular web application framework for Node.js. It provides a set of features and tools for building web applications and APIs. By requiring 'express', we can use its functionalities to create an Express application instance and define routes, middleware, and other server-related configurations.


const app = express();
// The above line creates an instance of the Express application , this instance is used to define routes , middleware , and other configurations for the server.
// by creating an instance of the express application we can use it to set up our server and handle incoming requests.


module.exports = app;
//this line indicates that we are exporitng the app instance created in this file , allowing other files to import and use it .

