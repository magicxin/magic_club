﻿const mongoose = require('mongoose');
const userSchema = require('../schema/userSchema');
const User = mongoose.model('user' , userSchema);

module.exports = User;