<template>
<div>
  <a-row style="height: 100%">
    <a-col span="12">
      <BaseChat/>
    </a-col>
    <a-col span="5" offset="1">
      <player :play-url="playUrl" :song-mid="songMid" :albummid="albummid" v-if="playUrl" style="width: 100%"/>
    </a-col>

    <a-col span="5" offset="1">
      <div style="height:calc(65vh);background-color: bisque;display: flex;flex-direction: column;align-items: flex-start">
        <div v-for="item in roomList" :key="item.id">
          <img :src="item.roomImg" style="width: 40px;border-radius: 20px"/>
          <b style="margin-left: 15px">{{item.roomName}}</b>
          <a-button type="primary" style="margin-left: 15px" icon="enter" size="small">进入</a-button>
        </div>
      </div>
    </a-col>
  </a-row>
</div>
</template>

<script>
import {baseRestUrl} from "@/api/base";
import player from "@/view/player";
import Player from "@/view/player";
import BaseChat from "@/components/BaseChat";

export default {
  name: "chat",
  components: {Player,BaseChat},
  comments:[
    player
  ],
  data(){
    return{
      userInfo: {},
      playUrl:'',
      albummid:'',
      songMid:'',
      uploadUrl: baseRestUrl+'/oss/upload',
      roomList:[]
      // heartCheck:{
      //   timeout:5000,
      //   timeoutObj:null,
      //   serverTimeoutObj:null,
      //   reset:this.heartCheckRest,
      //   start:this.heartCheckStart
      // }
    }
  },
  mounted() {
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(this.userInfo)
    this.playUrl=this.$route.query.playUrl
    this.albummid=this.$route.query.albummid
    this.songMid=this.$route.query.songMid
    this.getRoomList()
  },
  methods:{
    getRoomList(){
      this.$axios.getRoomList().then(res=>{
        this.roomList=res.data
      })
    },
  }
}
</script>

<style scoped>

</style>