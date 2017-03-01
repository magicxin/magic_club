const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	name : {
		unique : true,
		type : String
	},
	username :{
		unique : true,
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
//静态方法
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
	}
};
//post表单提交调用save方法后，在保存前的操作
userSchema.pre('save' , function(next){
	if(this.isNew){
		this.meta.updataAt = this.meta.createAt = Date.now();
	}else {
		this.meta.updataAt =Date.now();
	}
	next();
});
module.exports = userSchema;