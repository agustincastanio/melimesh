const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Melimesh is UP!"});
});

// Require CDS routes
require('./app/routes/cds.routes.js')(app);

// Require Cluster routes
require('./app/routes/cluster.routes.js')(app);

// define a catch-all route
app.get('*', (req, res) => {
    console.log("GET catch-all route.");
});

// define a catch-all route
app.post('*', (req, res) => {
    console.log("POST catch-all route.");
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});