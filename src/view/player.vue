<template>
<div>
  <img :src="cdImg" alt=""
       class="bg">
  <br>
  <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
  <audio ref="audio"
         @pause="onPause"
         @play="onPlay"
         @timeupdate="onTimeupdate"
         @loadedmetadata="onLoadedmetadata"
         @ended="musicEnd"
         :src="src"
         controls="controls">
  </audio>

  <div id="showLyric" v-html="lyricHtml" v-if="lyricHtml" class="lycContainer">
  </div>

</div>
</template>

<script>

import {songPlayDomain,ablnumDomain} from "@/const";
import {parseLyric} from "@/utils";
// import {getSongPlayUrl} from "@/api/axios";

// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second

  if (secondType === 'number' || secondType === 'string') {
    second = parseInt(second)

    var hours = Math.floor(second / 3600)
    second = second - hours * 3600
    var mimute = Math.floor(second / 60)
    second = second - mimute * 60

    return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
  } else {
    return '0:00:00'
  }
}


export default {
  name: "player",
  data () {
    return {
      src:'',
      cdImg:'',
      playUrl:'',
      albummid:'',
      songMid: '',
      lyricStr: '',
      lyricHtml:'',
      lycContainerHeight :'',
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      }
    }
  },
  mounted() {
    this.playUrl=this.$route.query.playUrl
    this.src=songPlayDomain+this.playUrl
    this.albummid=this.$route.query.albummid
    this.cdImg=ablnumDomain+this.albummid+".jpg"
    this.songMid=this.$route.query.songMid
    this.loadLyric()
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
      this.lycContainerHeight = document
          .getElementsByClassName("lycContainer")[0]
          .getBoundingClientRect()
          .height.toFixed(0);
      this.$refs.audio.play()
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      // console.log('timeupdate')
      // console.log(res)
      this.audio.currentTime = res.target.currentTime
      this.lycMonitor()
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
    },
    loadLyric(){
      if (!this.songMid){
        return
      }
      let q={
        songMid:this.songMid
      }
      this.$axios.getSongLyric(q).then(resp=>{
        this.lyricStr=resp.data.lyric
        // console.log(this.lyricStr)
        this.lyricHtml=parseLyric(this.lyricStr)
      })
    },
    lycMonitor() {
      //歌词监听滚动
      // console.log('正在监听:'+this.audio.currentTime.toFixed(0))
      let lycId = document.getElementById(this.audio.currentTime.toFixed(0));
      if (lycId) {
        if (lycId.offsetTop >
            (
                this.lycContainerHeight / 2 +
                lycId.getBoundingClientRect().height
            ).toFixed(0)
        ) {
          document.getElementsByClassName("lycContainer")[0].scrollTop = (
              lycId.offsetTop -
              this.lycContainerHeight / 2
          ).toFixed(0);
        }
        if (lycId.previousSibling){
          lycId.previousSibling.removeAttribute("style");//因为每个id，都不一样。当前lycid播放时，移出上一个歌词样式
        }
        lycId.style.cssText =
            "background: linear-gradient(-3deg,rgba(184,134,11,0.9) 0%,rgba(255,255,0,0.6) 60%);-webkit-background-clip: text;color: transparent;transform: scale(1.2);transition: all .5s ease-in;";//添加歌词样式
      }
    },
    musicEnd() {
      document.getElementsByClassName("lycContainer")[0].lastChild.removeAttribute("style"); //删除最后一个p的style
      let timer = setInterval(() => {
        //匀速回到开头
        document.getElementsByClassName("lycContainer")[0].scrollTop -= 10;
        if (document.getElementsByClassName("lycContainer")[0].scrollTop == 0) {
          clearInterval(timer);
        }
      }, 10);
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? '暂停' : '播放'
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second)
    }
  },


}
</script>

<style scoped >
@keyframes rotate {
  0%{-webkit-transform:rotate(0deg);}
  25%{-webkit-transform:rotate(90deg);}
  50%{-webkit-transform:rotate(180deg);}
  75%{-webkit-transform:rotate(270deg);}
  100%{-webkit-transform:rotate(360deg);}
}
.bg{
  animation: rotate 15s linear infinite;
  height: 200px;
  border-radius: 90px;
}
.lycContainer {
  height: 500px;
  padding: 0.625rem;
  box-sizing: border-box;
  font-size: 0.55rem;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}
.lycContainer -webkit-scrollbar {
  display: none;
}
</style>