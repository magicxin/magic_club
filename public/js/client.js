 var formvalidator = new FormValidator('signupForm',
    [
        {
            name : 'user[username]',
            display : '邮箱',
            rules : 'required|valid_email' 
        },
        {
            name : 'user[password]',
            display : '密码',
            rules : 'required|valid_password' 
        }
    ],
    function(errors, event) {
        if (errors.length > 0) {
            // Show the errors0
            document.getElementById('show_text').innerHTML = errors[0].message;
        }
    });  

 var userinfo_validator = new FormValidator('userinfoForm',
    [
        {
            name : 'user[name]',
            display : '昵称',
            rules : 'required' 
        },
        {
            name : 'user[avatar]',
            display : '头像',
            rules : 'required' 
        },
        {
            name : 'user[phone]',
            display : '电话',
            rules : 'required' 
        },
        {
            name : 'user[place]',
            display : '地址',
            rules : 'required' 
        },
        {
            name : 'user[info]',
            display : '个人简介',
            rules : 'required' 
        }
    ],
    function(errors, event) {
        if (errors.length > 0) {
            // Show the errors0
            document.getElementById('show_text').innerHTML = errors[0].message;
        }
    });  
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


/*个人信息*/
function uploadAvatar(){
 /* FormData 是表单数据类 */
 var fd = new FormData();
 var ajax = new XMLHttpRequest();
 var str = document.getElementById("avatar").value.toLowerCase()
 var position = str.lastIndexOf('.');
 var sub_str =  str.substring(position);
 console.log(sub_str)
// fd.append("upload", 1);
 /* 把文件添加到表单里 */
    if(sub_str === '.png' || sub_str === '.jpg' || sub_str === '.jpeg' || sub_str === '.bmp'){
         fd.append("avatar", document.getElementById("avatar").files[0]);
         console.log(fd)
         ajax.open("post", "/user/upload", true);

         ajax.onload = function () {
         //console.log(ajax.responseText)
         document.getElementById("show_avatar").src = ajax.responseText;
         document.getElementById("avatar_value").value = ajax.responseText;
         console.log(document.getElementById("avatar_value").value)
         };
        /* ajax.onreadystatechange = function(){
                if(ajax.readyState == 4 && ajax .status == 200){
                    console.log(ajax.responseText)
                    document.getElementById("show_avatar").src = ajax.responseText.path;
                }
            };*/
         ajax.send(fd);
    }else {
        console.log(sub_str)
        alert('请选择png格式图片文件');
    }

}
    
 










