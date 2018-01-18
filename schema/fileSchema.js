const mongoose = require('mongoose');
//密码算法bcrypt
const bcrypt = require('bcrypt');
const regex = require('../public/lib/regex');
//加密级别
const SALT_WORK_FACTOR = 10;
var fileSchema = new mongoose.Schema({
	name : {
		type : String
	},
	postfix :{
		type : String
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
fileSchema.add({
	name:String,
	postfix:String
});

//post表单提交调用save方法后，在保存前的操作
fileSchema.pre('save' , function(next){
	var file = this;
	next()
});
module.exports = fileSchema;