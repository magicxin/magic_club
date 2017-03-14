var userController = require('./controller/userController');
var articleController = require('./controller/articleController');

module.exports = function(app , upload){

/*
**
*ҳ����ת
*/
app.get('/user' , function(req , res){
	res.render('user' , { user : req.session.user});
});
//�û���¼
app.get('/signin' , function(req , res){
	res.render('signin', { user : req.session.user});
});
//�û�ע��
app.get('/signup' , function(req , res){
	res.render('signup', { user : req.session.user});
});
//�û�������ҳ
app.get('/user_page' , function(req , res){
		res.render('user_page' , {user : req.session.user});
	});
	//�û���Ϣ
app.get('/user_info' , function(req , res){
		res.render('user_info', { user : req.session.user});
	});
	//д����
app.get('/write_blog' , function(req , res){
		res.render('write', { user : req.session.user});
});

/*
**�û�·��
**author : magic
*/
//�û��˳�·��
app.get('/signout' , userController.signout);
//�û�ע��
app.post('/user/signup' , userController.signup);
//�û���¼
app.post('/user/signin' , userController.signin);
//�ϴ�ͷ��
app.post('/user/upload' , upload.single('avatar'), function(req , res){
	if(req.file.path.indexOf('public/') > -1){
		var ava_path = req.file.path.slice().replace('public/', '');
	}
	return res.status(200).end(ava_path);
});

/*
**����·��
**author : magic
*/
app.get('/' , articleController.list);
app.get('/home' , articleController.list);
//�ύ����
app.post('/save_blog' , articleController.add);
};