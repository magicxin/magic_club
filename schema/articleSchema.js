const mongoose = require('mongoose');
//加密级别
const SALT_WORK_FACTOR = 10;
var articleSchema = new mongoose.Schema({
	title : {
		type : String
	},
	author :{
		type : String
	},
	avatar : String,
	content : String,
	type : String,
	tag : String,
	like : {
		type : Number,
		default : 0
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
articleSchema.statics = {
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
articleSchema.pre('save' , function(next){
	if(this.isNew){
		this.meta.updataAt = this.meta.createAt = Date.now();
	}else {
		this.meta.updataAt =Date.now();
	}
	next();
});
module.exports = articleSchema;