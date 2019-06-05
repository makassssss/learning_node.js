var express = require('express');
var bodyParser = require('body-parser');
var db = require('./models');
var departments = require('./routes/departments');
var employees = require('./routes/employees');

var app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', employees, departments);

app.listen(3000, function() {
	db.sequelize.sync();
});

module.exports = app;
