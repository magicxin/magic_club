var username = null;
var password = null;
/*各类dom事件*/
 function openUserinfo(){
	var ele = document.getElementById('userinfo');
	ele.style.display = 'block';
	
	document.onclick = function(event){
		var event = event || window.event;
		var ele = document.getElementById('userinfo');
		var drop1 = document.getElementById('drop_down1');
		var drop2 = document.getElementById('drop_down2');
		if(event.target == drop1 || event.target == drop2){
			return false;
		}else {
			ele.style.display = 'none';
		}
	}
}


/*文章*/
function uploadAvatar(){
 /* FormData 是表单数据类 */
 var fd = new FormData();
 var ajax = new XMLHttpRequest();
// fd.append("upload", 1);
 /* 把文件添加到表单里 */
 fd.append("avatar", document.getElementById("avatar").files[0]);
 console.log(fd)
 ajax.open("post", "/user/upload", true);
 
 ajax.onload = function () {
 console.log(ajax.responseText)
 document.getElementById("show_avatar").src = ajax.responseText;
 };
/* ajax.onreadystatechange = function(){
		if(ajax.readyState == 4 && ajax .status == 200){
			console.log(ajax.responseText)
			document.getElementById("show_avatar").src = ajax.responseText.path;
		}
	};*/
 ajax.send(fd);
}
/*用户*/
//注册
function submitForm(){
		username = document.getElementById('username').value;
		password = document.getElementById('password').value;
		if(username && password){
			document.getElementById('signup').submit();
		}else {
			document.getElementById('show').style.display = 'block';
			document.getElementById('show_text').innerHTML = '您的输入有误';
		}
}









