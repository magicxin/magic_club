<template>
  <div class="dynamic">
    <div class="dynamic-item">
      <div class="top row">
        <div class="left co-center">
          <img :src="itemData.avatar || defaultAvatar" />
        </div>
        <div class="right column ro-center">
          <div class="dynamic-title">
            {{itemData.name}}
          </div>
          <div class="row">
            <div class="dynamic-date">
              {{itemData.date}}
            </div>
          </div>
        </div>
      </div>
      <div class="middle">
      	<div class="topic-container">
          <!--<div class="topic" v-if="itemData.topics.length>0">{{itemData.topics[0].content | topic}}</div>-->
          <div v-html="itemData.content"></div>
        </div>
        <!--start 发音频 -->
        <magic-audio v-if="itemData.audios.length>0" :audioData="itemData | audioData"></magic-audio>
        <!--end 发音频 -->

        <!--start 发视频 -->
        <video class="video" v-if="itemData.videos.length>0" poster="defaultAvatar" controls :src="itemData.videos[0]"></video>
        <!--end 发视频 -->

        <!--start 发图片 -->
        <magic-image v-if="itemData.images.length>0" :bigImage="itemData.images"></magic-image>
        <!--end 发图片 -->
      </div>
      <div class='bottom row' v-if="showBottom">
        <div class="left center">
          <i class="iconfont icon-pinglun" center></i>{{itemData.commentCount}}
        </div>
        <div class="right center" v-tap="{methods:like,id:itemData.id}">
          <i v-show="itemData.isSupport === '0'" class="iconfont icon-xihuan"></i>
          <i v-show="itemData.isSupport === '1'" class="iconfont icon-xihuan1"></i>{{itemData.supportCount}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import defaultAvatar from "assets/face.png";
import magicAudio from "components/audio/ma_audio";
import magicImage from "components/image/ma_image";
export default {
  name: "dynamic",
  data() {
    return {
      audioData: {
        id: "",
        url: ""
      },
      defaultAvatar:defaultAvatar,
      support: false,
      isSupport: "",
      supportCount: ""
    };
  }, // 截取日期字符串
  components: {
    magicAudio,
    magicImage
  },
  filters: {
//  sliceDate: function(value) {
//    if (!value) return "";
//    return value.slice(5, 10);
//  },
//  topic(value) {
//    return "#" + value + "#";
//  },
    audioData(value) {
      return {
        id: value.id,
        url: value.audios[0]
      };
    }
  },
  computed: {
//  showComments() {
//    return this.itemData.comments.slice(0, 3);
//  }
  },
  watch: {
    itemData(newV, oldV) {
      return newV;
    }
  },
  props: {
    itemData: {
      type: Object,
      required: true
    },
    showBottom: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    },
    showDetail: {
      type: Boolean,
      required: false,
      default() {
        return true;
      }
    }
  },
  methods: {
    goArticle(params) {
      //进入文章
      console.log(params);
      let item = params.item.share;
      this.$router.push({
        name: "channelDetail",
        query: {
          channel: JSON.stringify({
            desc: item.content,
            id: item.id,
            image: item.image,
            name: item.title,
            date: params.item.date,
            url: item.path
          })
        }
      });
    },
    goComment(params) {
      //进入评论
      this.$router.push({
        name: "comment",
        params: {
          id: params.id
        }
      });
    },
    like(params) {
      //点赞
      this.$
        .get({
          methodName: "CreateSpaceSupport",
          spaceId: params.id
        })
        .then(res => {
          this.support = true;
          this.isSupport = res.data.isSupport;
          this.supportCount = res.data.supportCount;
        });
    }
  }
};
</script>

<style>
	.dynamic-item{
		padding:10px;
		border-bottom:4px solid #eee;
	}
	.dynamic .left img{
		width:40px;
		height:40px;
	}
	.dynamic .bottom{
		padding:8px;
	}
	.dynamic .bottom .left,.dynamic .bottom .right{
		flex:1 1 0;
		border:1px solid #f5f5f5;
	}
</style>