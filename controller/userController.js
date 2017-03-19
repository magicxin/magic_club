const User = require('../model/User');
const _ = require('underscore');
module.exports = {
	add : function(req , res ){
		var _user = new User(req.body.user);
		console.log(_user)
		_user.save(function(err ,user){
			if(err){
				console.log(err);
			}
		});
	},
	delete : function(req , res){
		var id = req.body._id;
		User.remove({_id : id} , function(err){
			if(err){
				console.log(err);
			}
		});
	},
	update : function(req , res){
		var id = req.body._id;
		var userParams = req.body;
		
		User.findById(id , function(err , user){
			if(err){
				console.log(err);
			}else{
				var _user = _.extend(user , userParams);
				_user.save(function(){
					if(err){
						console.log(err);
					}else{
						
					}
				});
			}
		});
	},
	list : function(req , res){
		User.fetch(function(err , users){
			var resultUsers = _.map(users , function(user){
				if(err){
					console.log(err);
					}else{
						
					}
			})
		})
	},
	signin : function(req , res){
		var password = req.body.user.password;
		var username = req.body.user.username;
		if(username && password && password.length>0 && username.length>0){
            User.findOne({username : username} , function(err , user){
			if(err){
				console.log('signin err');
			}
			if(user){
				User.comparePwd(password , user.password , function(err , isMatch){
					if(err){
						console.log('compare password err');
					}
					if(isMatch){
						req.session.user = user;
						res.render('user_page' , {user : user});
					}else {
						res.render('signin' , {msg : '用户名密码错误'});
					}
				});
			}else{
				res.render('signin' , {msg : '用户名密码错误'});
			}
		  });
        }else{
            res.render('signin' , {msg : '请输入用户名密码'});
        }
	},
	signup : function(req , res , next){
		//var _user = req.body.user;
		//var user = new User(_user);
		//user.save();
		//var user1 = new User({ name: 'sss' });
		//user1.save();
        var valid_email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        var valid_password = /^[a-zA-Z]\w{5,17}$/;
        
        if(valid_password.test(req.body.user.password) && valid_email.test(req.body.user.username)){
        var username = req.body.user.username;
		User.findOne({username : username} , function(err , user){
			if(user){
				res.render('signup' , {msg : '用户名已存在'});
			}else{
				var _user = new User(req.body.user);
				console.log(_user)
				_user.save(function(err ,user){
					if(err){
						console.log(err);
					}
				});
				res.redirect('/');
			}
		});	
        }else {
            res.render('signup' , {msg : '请合法输入用户名密码'});
        }
		//console.log(req.body.user);
	},
    
	signout : function(req , res){
		delete req.session.user;
		res.render('home');
	},
    setUserinfo : function(req , res){
        console.log(req.body.user);
    }
	
	
}