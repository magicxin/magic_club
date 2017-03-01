const User = require('../model/User');
const _ = require('underscore');
module.exports = {
	add : function(req , res , next){
		var _user = new User(req.body.user);
		_user.save(function(err ,user){
			if(err){
				console.log('controller.add');
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
	findByUsername : function(req , res , func){
		var username = req.body.user.username;
		User.findOne({username : username} , func);	
	}
	
}