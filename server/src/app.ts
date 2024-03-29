import config from './config';

// Node/Express
import express = require('express');
import http = require('http');
import path = require('path');
import bodyParser = require('body-parser');

import router from './router';
import syncServiceDetails from './twilio/syncServiceDetails';

// Create Express webapp
const app = express();
app.use(express.static(path.join(__dirname, 'public')));

// use cors
// TODO: specify access control allow origin
import cors = require('cors');
app.use(cors());

// Add body parser for Notify device registration
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(router);

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.trace(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

// Get Sync Service Details for lazy creation of default service if needed
syncServiceDetails();

// Create http server and run it
const server = http.createServer(app);
const port = config.PORT;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});

export default app;
