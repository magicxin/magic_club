const File = require('../model/File');
const _ = require('underscore');
const fs = require("fs");
module.exports = {
	add : function(req , res ){
//		var _file = new File(req.body.file);
//		console.log(_file)
		console.log("准备写入文件");
		fs.writeFile('test.vue', '我是通过写入的文件内容！',  function(err) {
		   if (err) {
		       return console.error(err);
		   }
		   console.log("数据写入成功！");
		   console.log("--------我是分割线-------------")
		   console.log("读取写入的数据！");
		   fs.readFile('input.txt', function (err, data) {
		      if (err) {
		         return console.error(err);
		      }
		      console.log("异步读取文件数据: " + data.toString());
		   });
		});
//		_file.save(function(err ,user){
//			if(err){
//				console.log(err);
//			}
//		});
	}
	
}