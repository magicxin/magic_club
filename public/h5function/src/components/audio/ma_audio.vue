<template>
	<div class="audio-container">
		<audio width="50%" :ref="'audio' + audioData.id" @durationchange="setAudioTime" :id="'audio' + audioData.id" controls :src="addPath(audioData.url)">
		</audio>
		<div class="showAudio">
			<img v-show="showPlay" class="control" :src="start" v-tap="{methods:audioPlay,audioId:'audio' + audioData.id}" />
			<img v-show="!showPlay" class="control pause" :src="pause" v-tap="{methods:audioPause,audioId:'audio' + audioData.id}" />
			<img :src="volume" class="audio-picture" />
		</div>
		<div class="padd">
			{{audioMinute}}'{{audioSecond}}"
		</div>
	</div>
</template>
<script>
	/*
	 * @author suixin
	 * @params audioData{Obj}
	 * @requires id url  
	 * 
	 * @example <magic-audio :audioData="itemData"></magic-audio>
	 * 
	 * */
	import start from 'assets/start.png'
	import pause from 'assets/pause.png'
	import volume1 from 'assets/volume1.png'
	import volume2 from 'assets/volume2.png'
	import volume3 from 'assets/volume3.png'
	import volume4 from 'assets/volume4.png'

	export default {
		name: 'magic-audio',
		data() {
			return {
				volume:volume1,
				volumes:[volume1,volume2,volume3,volume4],
				start:start,
				pause:pause,
				showPlay:true, //控制播放按钮
				audioPicture:'',
				showVol:0,
				audioMinute:'00',//视频时长
				audioSecond:'00',
				audioTime:''
			}
		},
		props: {
			audioData: {
				type: Object,
				required: true
			}
		},
		methods: { //返回机制：若returnNative传了一个true值，会使用桥接的back 这里需要在相应的auth下配置native为true，并且在首位导航判断search。
			 //音频播放
	      audioPlay(e){
//	      	console.log(this.$refs[e.audioId])
	      	this.$refs[e.audioId].play()
	      	
	      	this.audioPicture = setInterval(() => {
	            this.volume = this.volumes[this.showVol++]
	            if(this.showVol === 4){
	            	this.showVol = 0
	            }
	            this.audioLoaded()
	          }, 1000)
	      	
	      	
	      	this.showPlay = false
	      },
	      audioPause(e){
	      	this.$refs[e.audioId].pause()
	      	clearTimeout(this.audioPicture)
	      	this.showPlay = true
	      },
	      setAudioTime(){
//	      	console.log(this.$refs['audio'+this.audioData.id].duration)
	      		this.audioTime = this.$refs['audio'+this.audioData.id].duration
		      	this.audioMinute = ~~(this.audioTime / 60)
		      	this.audioSecond = ~~(this.audioTime % 60)
	      },
	      audioLoaded(){
	      	if(this.audioTime>0){
	      		this.audioTime--
		      	this.audioMinute = ~~(this.audioTime / 60)
			    this.audioSecond = ~~(this.audioTime % 60)
	      	}else{
	      		clearTimeout(this.audioPicture)
	      	}
	      }
		},
		mounted() {

		}
	}
</script>

<style scoped>
	audio{
		display:none;
	}
	.audio-container{
		display:flex;
	}
	.showAudio {
		width:60%;
		height:30px;
		display:flex;
		align-items:center;
		justify-content: space-between;
		padding:0px 14px 0px 4px;
		margin-top: 5px;
	    margin-left: 15px;
	    border: solid 1px #F98700;
	    border-radius: 5px;
	}
	.control{
		width:24px;
	}
	.pause {
		width:16px;
	}
	.audio-picture{
		width:40px;
		
	}
	.padd{
		padding:4px;
	}
</style>