import axios from 'axios'
import init from 'tools/init.js'
import app from 'tools/app.js'
import Vue from 'vue'
import App from './app'
import router from './router'
import vueTap from 'v-tap'
import './css/iconfont.css'
import './css/common.css'
//全局引用swiper
import { Swipe, SwipeItem } from 'vue-swipe';
import 'vue-swipe/dist/vue-swipe.css'
//import VueVideoPlayer from 'vue-video-player'
Vue.config.productionTip = false
Vue.use(app)
Vue.use(vueTap)
//注册全局组件swiper
Vue.component('swipe', Swipe);
Vue.component('swipe-item', SwipeItem);

/*
 * main.js是vue程序的入口。
 * 引入了一个全局组件，公共数据存储以及方法的获取
 * 
 * 判断登录状态
 * 
 * 导航守卫
 * 
 * 
 * */

initProject()
//初始化
function initProject(){
	init()
	.then(res=>{
//			Vue.directive('go', {
//			    bind (el, binding) {
//			      el.addEventListener('click', () => {
//			        if (binding.value.indexOf('(') > 0) {
//			          let urlParams = binding.value.split('(')
//			          let _url = urlParams[0]
//			          let _parmas = urlParams[1].split(')')[0]
//			          let parmas = eval('(' + _parmas + ')')
//			          router.push({name: _url, params: parmas})
//			        } else {
//			          router.push(binding.value)
//			        }
//			      })
//			    }
//			})
			//导航守卫
			router.beforeEach((to, from, next) => {
			    next()
			})
			
		/* eslint-disable no-new */
		new Vue({
		  el: '#app',
		  router,
		  template: '<App/>',
		  components: { App }
		})
	})
}


