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
						res.render('signin' , {msg : '用户密码错误'});
					}
				});
			}else{
				res.render('signin' , {msg : '用户密码错误'});
			}
		});
	},
	signup : function(req , res , next){
		//var _user = req.body.user;
		//var user = new User(_user);
		//user.save();
		//var user1 = new User({ name: 'sss' });
		//user1.save();
		var username = req.body.user.username;
		User.findOne({username : username} , function(err , user){
			if(user){
				res.render('signup' , {msg : '用户已存在'});
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
		//console.log(req.body.user);
	},
	signout : function(req , res){
		delete req.session.user;
		res.render('home');
	}
	
	
}