﻿const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name : String,
	username : String,
	password : String
});

module.exports = userSchema;