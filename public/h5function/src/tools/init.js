import axios from 'axios'
import query from './getQueryVariable'
//屏蔽alert 测试时可注释掉

//window.alert = function(){} 

export default function(){
	return new Promise(function(resolve,reject){
		resolve('success')
	})
}
