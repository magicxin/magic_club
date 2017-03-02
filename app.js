const http = require('http');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
//下三个session持久化
const session = require('express-session');
const cookie = require('cookie-parser');
const mongoStore = require('connect-mongo')(session);

//marrkdown-it编辑插件
// node.js, "classic" way:
var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

// node.js, the same, but with sugar:
//var md = require('markdown-it')();
//var result = md.render('# markdown-it rulezz!');

// browser without AMD, added to "window" on script load
// Note, there is no dash in "markdownit".
//var md = window.markdownit();
//var result = md.render('# markdown-it rulezz!');

var userController = require('./controller/userController');
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
 app.use(function(req , res , next){
	 var _user = req.session.user;
	 if(_user){
		 app.locals.user = _user;
	 }
	 return next();
 });
//路由
app.get('/' , function(req , res){
	var result = md.render('# markdown-it rulezz!');
	res.render('home' , {result : result});
});
app.get('/home' , function(req , res){
	var articles = [
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
		{
			img : '',
			nickname : '32612254@qq.com',
			title : 'express开发中的常见问题',
			updatetime : '13分钟前',
			goodidea : 36,
		},
	]
	var result = md.render('# markdown-it rulezz!');
	res.render('home' , {articles : articles});
});
app.get('/user' , function(req , res){
	res.render('user');
});
//用户登录路由
app.get('/signin' , function(req , res){
	res.render('signin');
});
//用户注册路由
app.get('/signup' , function(req , res){
	res.render('signup');
});
//用户退出路由
app.get('/signout' , function(req , res){
	console.log(req.session.user);
		delete app.locals.user;
		delete req.session.user;
		res.render('home');
});
//用户注册
app.post('/user/signup' , function(req , res , next){
	//var _user = req.body.user;
	//var user = new User(_user);
	//user.save();
	//var user1 = new User({ name: 'sss' });
	//user1.save();
	userController.findByUsername(req ,res , function(err , user){
		if(user){
			res.render('signup' , {msg : '用户已存在'});
		}else{
			userController.add(req ,res);
			res.redirect('/');
		}
	});
	//console.log(req.body.user);
});
//用户登录
app.post('/user/signin' , function(req , res){
	var password = req.body.user.password;
	userController.findByUsername(req , res , function(err , user){
		if(err){
			console.log('signin err');
		}
		if(user){
			userController.comparePwd(password , user.password , function(err , isMatch){
				if(err){
					console.log('compare password err');
				}
				if(isMatch){
					req.session.user = user;
					res.render('signin' , {user : user});
				}else {
					res.render('signin' , {msg : '用户密码错误'});
				}
			});
		}else{
			res.render('signin' , {msg : '用户密码错误'});
		}
	});
});
app.listen(app.get('port') , function(){
	console.log('Express started on http://139.199.168.15:' + app.get('port') + ';pressCtrl-C to terminate.');
});
//server.listen(port , hostname);