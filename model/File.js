const mongoose = require('mongoose');
const fileSchema = require('../schema/fileSchema');
const File = mongoose.model('file' , fileSchema);

module.exports = File;