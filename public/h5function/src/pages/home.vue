<template>
	<div class="home">
		<ma-header name="帖子" :hideReturn="true"></ma-header>
		<dynamic v-for="(item,index) in itemData" :key="index" :itemData="item"></dynamic>
		<ma-footer></ma-footer>
	</div>
</template>

<script>
	import maFooter from 'components/maFooter'
	import maHeader from 'components/maHeader'
	import dynamic from 'components/dynamic/dynamic'
	export default {
		data(){
			return {
				itemData:[{
					id:'1',
					avatar:'',
					name:'第一篇帖子',
					date:'2017-10-11 11:39',
					content:'这是我发的一篇帖子',
					supportCount:'6',
					commentCount:'1',
					isSupport:'1',
					audios:[],
					videos:[],
					images:[],
				},{
					id:'1',
					avatar:'',
					name:'第一篇帖子',
					date:'2017-10-11 11:39',
					content:'这是我发的一篇帖子',
					supportCount:'6',
					commentCount:'1',
					isSupport:'1',
					audios:[],
					videos:[],
					images:[],
				},{
					id:'1',
					avatar:'',
					name:'第一篇帖子',
					date:'2017-10-11 11:39',
					content:'这是我发的一篇帖子',
					supportCount:'6',
					commentCount:'1',
					isSupport:'1',
					audios:[],
					videos:[],
					images:[],
				},{
					id:'1',
					avatar:'',
					name:'第一篇帖子',
					date:'2017-10-11 11:39',
					content:'这是我发的一篇帖子',
					supportCount:'6',
					commentCount:'1',
					isSupport:'1',
					audios:[],
					videos:[],
					images:[],
				}]
			}
		},
		components:{
			maFooter,maHeader,dynamic
		}
	}
</script>

<style>
</style>