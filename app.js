const http = require('http');
const express = require('express');
const hbs = require('hbs');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
var userController = require('./controller/userController');
const hostname = '127.0.0.1';
//const port = 3000;

const app = express();
//连接数据库mongodb
mongoose.connect('mongodb://localhost/magic_club');
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
//路由
app.get('/' , function(req , res){
	res.render('home');
});
app.get('/home' , function(req , res){
	res.render('home');
});
app.get('/user' , function(req , res){
	res.render('user');
});
//用户登录
app.get('/signin' , function(req , res){
	res.render('signin');
});
//用户注册
app.get('/signup' , function(req , res){
	res.render('signup');
});
app.post('/user/signup' , function(req , res , next){
	//var _user = req.body.user;
	//var user = new User(_user);
	//user.save();
	//var user1 = new User({ name: 'sss' });
	//user1.save();
	userController.findByUsername(req ,res , function(err , user){
		if(err){
			console.log('app err findByUsername');
		}
		if(user){
			res.render('signup' , {msg : '账号已存在'});
		}else{
			userController.add(req , res , next);
				res.redirect('/');
		}
	});
	//console.log(req.body.user);
});
app.listen(app.get('port') , function(){
	console.log('Express started on http://139.199.168.15:' + app.get('port') + ';pressCtrl-C to terminate.');
});
//server.listen(port , hostname);