<template>
<div>
  <img src="../assets/audio-bg1.png" alt=""
       class="bg">
  <br>
  <!-- 此处的ref属性，可以很方便的在vue组件中通过 this.$refs.audio获取该dom元素 -->
  <audio ref="audio"
         @pause="onPause"
         @play="onPlay"
         @timeupdate="onTimeupdate"
         @loadedmetadata="onLoadedmetadata"
         :src="src"
         controls="controls">
<!--         src="https://dl.stream.qqmusic.qq.com/C400002O8tgh0Mx1iq.m4a?guid=6530133126&vkey=104CD16DD2295A6206483A56A617AFE781585316EC4190FB8F9F67208C3F3B2798170A00AB6C7479F668F6252E2CEC68293C3060144F6541&uin=&fromtag=66"-->

  </audio>

</div>
</template>

<script>
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
  props:[
      'src',
      'cdImg'
  ],
  data () {
    return {
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
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    // 播放音频
    play () {
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
    },
    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      // console.log('loadedmetadata')
      // console.log(res)
      this.audio.maxTime = parseInt(res.target.duration)
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
  }

}
</script>

<style scoped>
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
</style>