/*eslint-disable object-shorthand, prefer-destructuring, prefer-template*/

var express = require('express');
var db = require('../models');

var app = express();

app.on('event', function(req) {
	var time = req.time;
	var event = req.event;
	db.logs.create({
		event: event,
		time: time,
	});
});

function logToDB(event) {
	var now = new Date();
	var time = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	app.emit('event', { event: event, time: time });
}

module.exports = logToDB;
