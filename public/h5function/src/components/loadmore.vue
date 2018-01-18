<template>
  <div id="loadMore">
    <slot></slot>
    <div v-if="showMsg">
      	<div v-if="!loaded" class="loadmore">下拉查看更多活动~</div>
      	<div v-else class="loadover">我是有底线的~</div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable */
 let el = null
  export default {
    name: 'loadmore',
    props: {
      getMore: {
        type: Function
      },
      allLoaded: {
        type: Boolean,
        default () {
          return false
        }
      },
      showMsg: {
      	type: Boolean,
        default () {
          return false
        }
      }
    },
     watch: {
	   	allLoaded(newValue,oldValue){
	    this.loaded = newValue
	   }
	  },
    data () {
      return {
        translate: 0,
        scrollEventTarget: null,
        startY: 0,
        startScrollTop: 0,
        currentY: 0,
        direction: undefined,
        scrollHeight: 0,
        windowHeight: 0,
        status: 'beforLoading',
        loaded:false,
        scrollY:''
      }
    },
    methods: {//取可以滚动的元素
    	getScroll(){
    		if(window.scrollY != 0){
    			this.scrollY = window.scrollY
//  			console.log(window.scrollY)
    		}
    	},
      getScrollEventTarget (element) {
        let currentNode = element
        while (currentNode && currentNode.tagName !== 'HTML' &&
          currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
//						console.log(currentNode.classList)
            if (currentNode.classList.contains('scroll-box')) {
              return currentNode
            }
            currentNode = currentNode.parentNode
          }
        return
      },
      getScrollTop (element) {
        if (element === window) {
          return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
        } else {
          return element.scrollTop;
        }
      },
      handleTouchStart (event) {
        this.status = 'loading'
        this.startY = event.touches[0].clientY
        // 获得屏幕包括滚动条的尺寸
        this.scrollHeight = el ? el.scrollHeight : this.$.scrollHeight;
        // 获得屏幕的显示区尺寸 就是不包括滚动条的
        this.windowHeight = el ? el.clientHeight : this.$.windowHeight;
        // 获取开始时 滚动条的位置
        // this.startScrollTop = getScrollTop();
      },
      handleTouchMove (event) {
        // 获取滚动条的距离
        let scrollTop = el ? el.scrollTop : this.$.scrollTop;
        let distanceToBotom = this.scrollHeight - (this.windowHeight + scrollTop)
        if (distanceToBotom > 50) {
          return
        }
        this.status = 'loading'
        this.currentY = event.touches[0].clientY;
        let distance = (this.currentY - this.startY)
        this.direction = distance > 0 ? 'down' : 'top'
        // 判断滚动的距离有没有 到一定程度 如果有 就改变状态
        // this.translate = Math.abs(distance) > 40 ? 40 : distance
        if (Math.abs(distance) > 100 && this.direction === 'top') {
        	if(this.scrollY + window.innerHeight >= document.documentElement.scrollHeight && window.scrollY>0 ){
        		this.status = 'loadmore'
        	}
//        this.status = 'loadmore'
        }
      },
      handleTouchEnd () {
        if (this.status === 'loadmore' && this.direction === 'top' && !this.allLoaded) {
          this.getMore()
          this.status = 'beforLoading'
        }
      },
      init (el) {
      	//绑定点击事件
        this.$el.addEventListener('touchstart', this.handleTouchStart);
        this.$el.addEventListener('touchmove', this.handleTouchMove);
        this.$el.addEventListener('touchend', this.handleTouchEnd);
        //      FireFox  
    if(document.addEventListener){ 
        document.addEventListener("DOMMouseScroll" ,this.getScroll, false);  
	    }  
	    //IE、Opera、Chrome  
	    window.onscroll=document.onscroll = this.getScroll;  
      }
    },
    mounted () {
      el = this.getScrollEventTarget(this.$el)
      this.init()   
    }
  }
</script>

<style>
  #loadMore {
    
  }

  #loadMore .loadmore{
  	width: 100%;
  	height: 35px;
  	text-align: center;
  	line-height: 35px;
  	color: #bdbdbd;
  }
  #loadMore .loadover{
  	width: 100%;
  	height: 35px;
  	text-align: center;
  	line-height: 35px;
  	color: #bdbdbd;
  }
</style>
