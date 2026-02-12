const app = require('./src/app');
// The above line imports the Express application instance from the app.js file located in the src directory.
//This allows us to use the express application defined in app.js to set up our server and handle incoming requests.

// app.listen is used to start the server and listen for incoming requests on a specified port. In this case, we are using port 3000.
//when the server starts successfully , it will log a message to the console indicatiing that the server is running and on which port it is listening for requests.
// The callback function passed to app.listen is executed once the server is up and running , allowing you to perform any necessary setup or logging after the server has started.
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
