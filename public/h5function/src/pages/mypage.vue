<template>
	<div class="mypage">
		<ma-header name="我的" :hideReturn="true"></ma-header>
		<div class="column">
			<div class="row">
				<div class="left">
					<div class="cover"><img :src="avatar"/></div>
				</div>
				<div class="middle co-center">nicheng</div>
				<div class="right"></div>
			</div>
			<div class="row">
				<div class="left co-center"><i class="iconfont icon-shoucang"></i></div>
				<div class="middle co-center">收藏</div>
			</div>
			<div class="row">
				<div class="left co-center"><i class="iconfont icon-guanzhu"></i></div>
				<div class="middle co-center">关注</div>
			</div>
		</div>
		<ma-footer></ma-footer>
	</div>
</template>

<script>
	import avatar from 'assets/face.png'
	import maHeader from 'components/maHeader'
	import maFooter from 'components/maFooter'
	export default {
		data(){
			return {
				avatar : avatar
			}
		},
		components:{
			maFooter,maHeader
		}
	}
</script>

<style>
	.mypage {
		height:100%;
	}
	.mypage .column{
		background:#eee;
	}
	.mypage .row {
		margin-bottom: 1em;
		background:#fff;
	}
	.mypage .left{
		overflow: hidden;
	}
	.mypage .cover{
		width:15vw;
		height:15vw;
	}
	.mypage .left img{
		width:100%;
		object-fit : cover;
	}
</style>