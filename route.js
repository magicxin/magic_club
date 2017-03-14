var userController = require('./controller/userController');
var articleController = require('./controller/articleController');

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
app.post('/user/upload' , upload.single('avatar'), function(req , res){
	if(req.file.path.indexOf('public/') > -1){
		var ava_path = req.file.path.slice().replace('public/', '');
	}
	return res.status(200).end(ava_path);
});

/*
**文章路由
**author : magic
*/
app.get('/' , articleController.list);
app.get('/home' , articleController.list);
//提交文章
app.post('/save_blog' , articleController.add);
};