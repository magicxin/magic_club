var getContent = function(){
	var txt = document.getElementById('text').value+'';
	/*var xmlHttp = null;
	if(window.XMLHttpRequest){
		console.log('yes')
		xmlHttp = new XMLHttpRequest();
	}
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp .status == 200){
			console.log('success')
			console.log(xmlHttp.responseText)
			document.getElementById('show_text').innerHTML = xmlHttp.responseText;
		}
	};
	xmlHttp.open("GET","/markdown?txt="+txt,true);
	xmlHttp.send();*/
	var md = window.markdownit({
	  html: true,
	  linkify: true,
	  typographer: true
	});
	var result = md.render(txt);
	console.log(result)
	document.getElementById('show_text').innerHTML = result;
};

var submitArticle = function(){
	var xmlHttp = null;
	var data = null;
	var username = document.getElementById('username').value;
	var avatar = document.getElementById('avatar').value;
	var title = document.getElementById('title').value;
	var _text = document.getElementById('text').value;
	data = {
		title : title,
		author : username,
		avatar : avatar,
		content : _text
	}
	var data_str = (function(obj){ // 转成post需要的字符串.
						var str = "";
					 
						for(var prop in obj){
							str += prop + "=" + obj[prop] + "&"
						}
						return str;
					})(data);
	if(window.XMLHttpRequest){
		console.log('yes')
		xmlHttp = new XMLHttpRequest();
	}
	xmlHttp.onreadystatechange = function(){
		if(xmlHttp.readyState == 4 && xmlHttp .status == 200){
			console.log('success')
		}
	};
	xmlHttp.open("POST","/save_blog",true);
	//post提交需要设置
	xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlHttp.send(data_str);
}