<template>
	<div class="image-container">
		<div class="img-content" v-if="hasSmall">
			<div class="item-content" v-for="(item,index) in smallImage">
				<img class="small" :src="addPath(item)" v-tap="{methods:goImageReader,count:index,urls:smallImage}" />
			</div>
		</div>
		<div class="img-content" v-if="!hasSmall">
			<div class="item-content" v-for="(item,index) in bigImage">
				<img class="small" :src="addPath(item)" v-tap="{methods:goImageReader,count:index,urls:bigImage}" />
			</div>
		</div>
		
		<!--start 查看大图 -->
		<div v-if="showBig" class="big-image">
			<div class="reader-content" v-tap="{methods:closeBig}">
				<img :src="addPath(urls[count])" @touchstart="tapStart" @touchmove="tapMove" @touchend="tapEnd"/>
			</div>
		</div>
		<!--end 查看大图 -->
	</div>
</template>
<script>
	/*
	 * @author suixin
	 * @params smallImage{Array} bigImage{Array}
	 * @requires false true
	 * 
	 * @example <magic-image :bigImage="itemData.images"></magic-image>
	 * 
	 * */
	export default {
		name: 'magic-image',
		data() {
			return {
				hasSmall: false,
				showBig:false,
				count:'',
				urls:'',
				frontOrNext:''
			}
		},
		props: {
			smallImage: {
				type: Array,
				required: false
			},
			bigImage: {
				type: Array,
				required: true
			}
		},
		methods: {
			goImageReader(params) {
				this.showBig = true
				document.querySelector('body').style.overflow = 'hidden'
//				document.querySelector('html').style.overflow = 'visible'
				this.count = params.count
				this.urls = params.urls
//				console.log(params.urls)
//				console.log(params)
//				this.$router.push({
//					name: 'big_image',
//					params: {
//						count: params.count,
//						urls: params.urls
//					}
//				})
		},
			closeBig(){
				this.showBig = false
				document.querySelector('body').style.overflow = 'visible'
				document.querySelector('html').style.overflow = 'visible'
				console.log(window.scrollY)
			},
			tapStart(e){
                this.startX = e.targetTouches[0].screenX
//                console.log(e.targetTouches[0].screenX)
            },
            tapMove(e){
                if(e.targetTouches[0].screenX - this.startX < -50 ){
                    this.frontOrNext = 'next'
                  }else if(e.targetTouches[0].screenX - this.startX > 50 ){
                        this.frontOrNext = 'front'
                  }else{
                  	this.frontOrNext = ''
                  }
//                console.log(e.targetTouches[0].screenX)
            },
            tapEnd(e){
            	if(this.frontOrNext == 'next' && +this.count >= this.urls.length-1){
//                 	this.$.toast('已经是最后一张')
                  }
                if(this.frontOrNext == 'next' && +this.count < this.urls.length-1){
                        this.count = +this.count + 1
                    console.log(this.count)
                  }
                if(this.frontOrNext == 'front' && +this.count<=0){
//              	this.$.toast('已经是第一张')
                }
                if(this.frontOrNext == 'front' && +this.count > 0){
                        this.count = +this.count - 1
                  }
                console.log(this.frontOrNext)
            }
		},
		watch: {
			smallImage: function(newV, oldV) { //为了判断直接小图的时候直接放较大的图还是有较小的图
				if(newV) {
					this.hasSmall = true
				} else {
					this.hasSmall = false
				}
			}
		}
	}
</script>

<style scoped>
	.img-content {
		display: flex;
		flex-wrap: wrap;
	}
	
	.item-content {
		width: 28vw;
		height: 28vw;
		display: flex;
		align-items: center;
		background: #fff;
		overflow-y: hidden;
		margin: 4px 4px 0 0;
	}
	
	.small {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.big-image{
		position:fixed;
		transform: translateZ(0);
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background:#000;
		z-index:1000;
	}
	.reader-content{
		width:100vw;
		height:100vh;
		display:flex;
		align-items: center;
	}
	.reader-content img{
		width: 100%;
		height:90%;
		object-fit: contain;
	}
</style>