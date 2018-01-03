const http = require('http');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
//下三个session持久化
const session = require('express-session');
const cookie = require('cookie-parser');
const mongoStore = require('connect-mongo')(session);
//日期格式化
//var moment = require('moment');
//moment().format();
//上传文件解析插件
const multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() +'.png');
  }
})
//const upload = multer({ dest: './public/uploads/' });
const upload = multer({ storage: storage });
//marrkdown-it编辑插件
// node.js, "classic" way
var md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
//var MarkdownIt = require('markdown-it'),
 //   md = new MarkdownIt();

// node.js, the same, but with sugar:
//var md = require('markdown-it')();
//var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
//var md = window.markdownit();
//var result = md.render('# markdown-it rulezz!');

var userController = require('./controller/userController');
var articleController = require('./controller/articleController');
const hostname = '127.0.0.1';
//const port = 3000;
const dburl = 'mongodb://localhost/magic_club';
const app = express();
/*不加服务器会一直报错Mongoose: mpromise (mongoose's default promise library) is deprecated,
 plug in your own promise library instead: http://mongoosejs.com/docs/promises.html      但不影响使用*/
mongoose.Promise = global.Promise;
//连接数据库mongodb
mongoose.connect(dburl);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected");
  
});
//添加模板引擎
app.set('view engine', 'hbs');
app.set('port' , process.env.PORT || 3000);
//添加静态文件
app.use(express.static(__dirname +'/public'));
//添加表单格数据式化
app.use(bodyparser());
//app.use(bodyparser.json()); // for parsing application/json
//app.use(bodyparser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(multer()); // for parsing multipart/form-data
//添加支持session  cookie
app.use(cookie());
//添加session
app.use(session({
	secret : 'magic',
	store : new mongoStore({
		 url : dburl,
		 collection : 'sessions'
	 })
}));
//中间件对于session预处理
/* app.use(function(req , res , next){
	 console.log(app.locals.user);
	 var _user = req.session.user;
	 if(_user){
		 app.locals.user = _user;
	 }
	 return next();
 });*/
require('./route')(app , upload);
app.listen(app.get('port') , function(){
	console.log('Express started on localhost:' + app.get('port') + ';pressCtrl-C to terminate.');
});
//server.listen(port , hostname);