<template>
	<div class="container">
		<div class="fullbutton">{{name}}</div>
	</div>
</template>
<script>
	export default {
		name: 'magic-audio',
		data() {
			return {
				
			}
		},
		props: {
			name: {
				type: String,
				required: true
			}
		},
		methods: { 
		},
		mounted() {

		}
	}
</script>

<style scoped>
	.container{
		width:100%;
		height:50px;
	}
	.fullbutton{
		position: fixed;
		width:100vw;
		height:50px;
		bottom:0;
		display:flex;
		justify-content: center;
		align-items: center;
		color:#fff;
		background:#f98700;
		z-index:10;
	}
</style>