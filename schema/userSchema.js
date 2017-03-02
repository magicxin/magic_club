const mongoose = require('mongoose');
//密码算法bcrypt
const bcrypt = require('bcrypt');
//加密级别
const SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
	name : {
		type : String
	},
	username :{
		type : String
	},
	password : String,
	type : {
		type : Number,
		default : 0
	},
	level : {
		type : Number,
		default : 0
	},
	reputation : {
		type : Number,
		default : 0
	},
	gold : {
		type : Number,
		default : 100
	},
	meta : {
		createAt : {
			type : Date,
			default : Date.now()
		},
		updateAt : {
			type : Date,
			default : Date.now()
		}
	}
});
//静态方法 可以由类调用
userSchema.statics = {
	fetch : function(cb){
		return this.find({})
		.sort('meta.createAt')
		.exec(cb);
	},
	findById : function(id , cb){
		return this.findOne({_id : id})
		.sort('meta.createAt')
		.exec(cb);
	},
	comparePwd : function(_password , password , func){
		bcrypt.compare(_password , password , func);
	}
};

//post表单提交调用save方法后，在保存前的操作
userSchema.pre('save' , function(next){
	var user = this;
	if(this.isNew){
		this.meta.updataAt = this.meta.createAt = Date.now();
	}else {
		this.meta.updataAt =Date.now();
	}
	//对保存的密码进行加密操作
	bcrypt.genSalt(SALT_WORK_FACTOR , function(err , salt){
		if(err){
			return next(err);
		}
		bcrypt.hash(user.password , salt , function(err , hash){
			if(err){
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
	//next();
});
module.exports = userSchema;