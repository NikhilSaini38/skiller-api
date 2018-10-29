////
/// @page skiller_api/app
/// @author Nikhil Saini
/// @desc Entry point for the server script
////
"use strict";
//import global variable and methods
require("./globals");
let bodyParser = require('body-parser');

var SwaggerExpress = require("swagger-express-mw");
var Express = require("express");
var app = Express();
module.exports = app; // for testing
app.use(bodyParser.json());
var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }

  // install middleware
  swaggerExpress.register(app);

  //connect to database
  var db = dbConfig.urls.dev;
  mongooseInstance
    .connect(db)
    .then(() => {
      console.log(`Database connected at ${db}`);
    })
    .catch("Error connecting to database: ", console.log);

  //start the server
  var port = process.env.PORT || serverConfig.port;
  app.listen(port).on("listening", err => {
    console.log(
      !err
        ? `Server Listening at http://localhost:${port}`
        : "unable to start server"
    );
  });
});
