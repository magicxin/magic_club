import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)



// 其他
let otherRoutes = [{
	   path: '/home',
	   name: 'home', // 帖子
	  component:resolve => {require.ensure([], function(require){resolve(require('../pages/home'));}, 'home')},
	 },
	 {
	   path: '/mypage',
	   name: 'mypage', // 我的
	  component:resolve => {require.ensure([], function(require){resolve(require('../pages/mypage'));}, 'mypage')},
	 },
	 {
	   path: '/mydynamic',
	   name: 'mydynamic', // 动态
	  component:resolve => {require.ensure([], function(require){resolve(require('../pages/mydynamic'));}, 'mydynamic')},
	 },
	  {
		path: '*',
		redirect: '/home'
	}
]
let routes = [...otherRoutes]

export default new Router({
	routes
})