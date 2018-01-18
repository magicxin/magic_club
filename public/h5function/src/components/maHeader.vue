<template>
	<div class="header-container">
		<div class="header-fix">
			<div class="left">
				<i v-if="!hideReturn" v-tap="{methods:goBack}" class="iconfont icon-fanhui"></i>
			</div>
			<div class="middle" v-if="name !== ''">{{name}}</div>
			<!--  在标题是tab栏的时候隐藏名称 -->
			<slot name="title-middle" class="title-middle"></slot>
			<div class="right">
				<slot name="title-right"></slot>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name:'ma-header',
		data() {
			return {
				
			}
		},
		props: {
			hideReturn:{
				type:Boolean,
				default(){
					return false
				}
			},
			name: {
				type: String,
				required: false,
				default() {
					return "V服爱车"
				}
			},
			returnNative:{
				type:Boolean,
				required:false,
				default(){
					return false
				}
			}
		},
		methods: {
			goBack(params) {
					this.$router.back()
			}
		},
		created(){
			
		}
	}
</script>

<style scoped>
	.header-container{
		width:100%;
		height:50px;
	}
	.header-fix {
		position: fixed;
		width: 100%;
		height: 50px;
		display: flex;
		border-bottom: 1px solid #929292;
		background-color: #F7F7F7;
		z-index: 100;
	}
	
	.left,
	.right,
	.middle {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.left {
		width: 50px;
	}
	
	.right {
		width: 50px;
	}
	
	.middle {
		width: calc(100% - 100px);
		font-size:20px;
	}
	
	.left-return {
		width: 24px;
	}
</style>