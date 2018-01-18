var userController = require('./controller/userController');
var articleController = require('./controller/articleController');
var fileController = require('./controller/fileController');
var filter = require('./filter');
const fs = require("fs");
module.exports = function(app , upload){

/*
**
*页面跳转
*/
app.get('/user' , function(req , res){
	res.render('user' , { user : req.session.user});
});
//用户登录
app.get('/signin' , function(req , res){
	res.render('signin', { user : req.session.user});
});
//用户注册
app.get('/signup' , function(req , res){
	res.render('signup', { user : req.session.user});
});
//用户个人主页
app.get('/user_page' , function(req , res){
		res.render('user_page' , {user : req.session.user});
	});
	//用户信息
app.get('/user_info' , function(req , res){
		res.render('user_info', { user : req.session.user});
	});
	//写文章
app.get('/write_blog' , function(req , res){
		res.render('write', { user : req.session.user});
});

/*
**用户路由
**author : magic
*/
//用户退出路由
app.get('/signout' , userController.signout);
//用户注册
app.post('/user/signup' , userController.signup);
//用户登录
app.post('/user/signin' , userController.signin);
//上传头像
app.post('/user/upload' , upload.single('avatar'), userController.uploadAvatar);
//用户信息
app.post('/user/setuserinfo' , userController.setUserinfo);
/*
**文章路由
**author : magic
*/
app.get('/' , filter.checkAuth,articleController.list);
app.get('/home' , articleController.list);
//提交文章
app.post('/save_blog' , articleController.add);

/*
 * author : magic
 * date:2018.1.16
 * 
 * 
 * */
app.get('/create_file' ,function(req , res){
//	console.log("查看 /pages 目录");
//	fs.readdir("./public/h5function/src/pages",function(err, files){
//	   if (err) {
//	       return console.error(err);
//	   }
//	   files.forEach( function (file){
//	       console.log( file );
//	   });
//	});
	console.log("准备写入文件");
		fs.writeFile('./public/h5function/src/pages/'+'test.vue', '我是通过写入的文件内容！',  function(err) {
		   if (err) {
		       return console.error(err);
		   }
		   console.log("数据写入成功！");
//		   console.log("--------我是分割线-------------")
//		   console.log("读取写入的数据！");
//		   fs.readFile('test.vue', function (err, data) {
//		      if (err) {
//		         return console.error(err);
//		      }
//		      console.log("异步读取文件数据: " + data.toString());
//		   });
		});
			res.set({'Content-Type':'text/json','Encodeing':'utf8'});
			res.send({"1":{id:1,name:"test"},"2":{id:2,name:"test"}});
});
};
