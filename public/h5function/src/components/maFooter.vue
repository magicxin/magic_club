<template>
	<div class="footer-container">
		<div class="footer">
	    	<div class="tab" v-tap="{methods:go,route:'home'}">
	    		<i class="iconfont icon-shouye"></i>
	    	</div>
	    	<div class="tab" v-tap="{methods:go,route:'mydynamic'}">
	    		<i class="iconfont icon-dongtai"></i>
	    	</div>
	    	<div class="tab" v-tap="{methods:go,route:'mypage'}">
	    		<i class="iconfont icon-wode"></i>
	    	</div>
	    </div>
	</div>
</template>

<script>
	export default {
		name:'ma-footer',
		methods:{
			go(params){
	    		this.$router.push({
	    			name:params.route
	    		})
	    	}
		}
	}
</script>

<style scoped="scoped">
.footer-container{
		width:100%;
		height:50px;
	}
 .footer {
	position:fixed;
	height:50px;
	width:100%;
	display:flex;
	background:#333;
	bottom:0;
	transform: translateZ(0);/*去抖*/
}
 .tab {
	flex:1 1 0;
	display:flex;
	justify-content: center;
	align-items: center;
}
</style>