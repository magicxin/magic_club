const http = require('http');
const express = require('express');
const hbs = require('hbs');
const hostname = '127.0.0.1';
//const port = 3000;

const app = express();
//添加模板引擎
 app.set('view engine', 'hbs');
app.set('port' , process.env.PORT || 3000);
//添加静态文件
app.use(express.static(__dirname +'/public'));
//路由
app.get('/' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('home');
});
app.get('/home' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('home');
});
app.get('/user' , function(req , res){
	//res.type('text/plain');
	//res.send('FirtTest');
	res.render('user');
});
app.listen(app.get('port') , function(){
	console.log('Express started on http://139.199.168.15:' + app.get('port') + ';pressCtrl-C to terminate.');
});
//server.listen(port , hostname);