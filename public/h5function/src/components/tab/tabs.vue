<template>
	<div class="tabs">
		<div class="title">
			<div v-for="(item,index) in tabData" :class="count[index]?check:uncheck" v-tap="{methods:changeTab,count:index,arr:tabData}">
				{{item.title}}<div v-if="item.redMsg?true:false" class="tab-red-msg"></div>
			</div>
		</div>
    <div>
      <slot></slot>
    </div>
		<div class="tab-container">
			<slot v-for="(item,index) in count" v-if="item" :name="'tab'+index"></slot>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				count:[true,false],
				check:'tab',
				uncheck:'uncheck'
			}
		},
		props: {
			tabData: {
				type: Array,
				required: true
			}
		},
		methods: {
			changeTab(params) {
				params.arr && params.arr.forEach((item,index)=>{
					this.count[index]=false
					this.$set(this.count,index,false);
				})
				if(this.tabData[params.count].hasOwnProperty('redMsg')){
					this.tabData[params.count].redMsg = false//去掉红点
					this.$emit('removeRed',params.count)
				}
				this.count[params.count] = true
				this.$set(this.count,params.count,true);
        
        // 切换tab事件
        this.$emit("changeTab", params.count);
			}
		},
		mounted() {

		}
	}
</script>

<style>
	.tabs {
		
	}
	.tabs .title{
		display:flex;
		width:100%;
		height:50px;
		border-bottom : 1px solid #F1F1F5;
	}
	.tabs .tab ,.tabs .uncheck{
		position:relative;
		display:flex;
		flex:1 1 0;
		justify-content: center;
		align-items: center;
	}
	.tabs .tab{
		border-bottom:2px solid #f98700;
		color:#f98700;
	}
	.tabs .tab-container{
		width:100%;
		
	}
	.tabs .uncheck {
		
	}
	.tab-red-msg{
		position:absolute;
		top:0;
		right:2em;
		transform: translate(-100%,100%);
		width:6px;
		height:6px;
		border-radius: 3px;
		background: red;
	}
</style>