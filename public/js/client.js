
 function openUserinfo(){
	var ele = document.getElementById('userinfo');
	ele.style.display = 'block';
}

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