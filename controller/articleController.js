const Article = require('../model/Article');
const _ = require('underscore');
module.exports = {
	add : function(req , res ){
		var _article = new Article(req.body);
		_article.save(function(err ,user){
			if(err){
				console.log(err);
			}
		});
	},
	delete : function(req , res){
		var id = req.body._id;
		Article.remove({_id : id} , function(err){
			if(err){
				console.log(err);
			}
		});
	},
	/*update : function(req , res){
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
	},*/
	list : function(req , res){
		Article.find({} , function(err , articles){
			if(err) {
				console.log('article find err.');
			}else {
				//var result = md.render(articles);
				res.render('home' , {articles : articles , user : req.session.user});
			}
		});
	}
	/*findByUsername : function(req , res , func){
		var username = req.body.user.username;
		User.findOne({username : username} , func);	
	},
	comparePwd : function(_password , password , func){
		User.comparePwd(_password , password , func);
	}*/
	
}