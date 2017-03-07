const mongoose = require('mongoose');
const articleSchema = require('../schema/articleSchema');
const Article = mongoose.model('article' , articleSchema);

module.exports = Article;