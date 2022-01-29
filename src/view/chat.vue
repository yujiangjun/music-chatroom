<template>
<div>
  <a-row style="height: 80%">
    <a-col span="8">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
              :description="item.msgContent.time"
          >
<!--            <img src="item.msgContent" v-if="item.msgContent.indexOf('base64')>0" style="width: 20px;height: 20px"/>-->
            <div style="display: flex;" slot="title">
              <b style="font-size: 20px">{{item.sendUser.name}}:</b>
              <span>{{ item.msgContent.msgContent }}</span>
            </div>
<!--            <a slot="title">{{ item.msgContent.msgContent }}</a>-->
            <a-avatar
                slot="avatar"
                :src="item.sendUser.head"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>
  <a-row>
    <a-col span="17" offset="2">
      <div style="display: flex;flex-direction: column">
        <div style="display: flex">
          <a-upload
              name="file"
              listType="picture"
              :before-upload="beforeUpload"
              @change="uploadFile"
              style="display: flex"
          >
            <a-button type="primary" shape="circle" icon="cloud-upload"/>
          </a-upload>
          <a-button type="primary" shape="circle" icon="smile" @click="()=>this.showEmoji=!this.showEmoji"/>
          <a-popover
              trigger="hover"
              :visible="showEmoji"
              @visibleChange="()=>this.showEmoji=!this.showEmoji"
          >
            <div slot="content">
              <VEmojiPicker @select="selectEmoji" v-if="showEmoji"/>
            </div>
          </a-popover>
        </div>
        <a-textarea placeholder="请输入。。。。" :rows="4" v-model="msg"/>
      </div>
    </a-col>
    <a-col span="2" offset="1">
      <a-button type="primary" style="border-radius: 5px" @click="sendMsg">发送</a-button>
    </a-col>
  </a-row>
</div>
</template>

<script>
import wsUrl from "@/api/base";
// import {getImageBytes} from "@/utils";
import {msgType} from "@/const";

const data = [];
export default {
  name: "chat",
  data(){
    return{
      data,
      msg:'',
      socket: null,
      showEmoji: false, //显示emoji弹框
      userInfo: {}
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
    this.socketInit()
    window.onbeforeunload=()=>this.socket.close();
    this.userInfo = this.$store.state.userInfo.payload
  },
  methods:{
    socketInit(){
      this.socket=new WebSocket(wsUrl)
      this.socket.onopen=this.socketOpen()
      this.socket.onerror=this.socketError
      this.socket.onmessage=this.socketGetMsg
      this.socket.onclose=this.socketClose
    },
    sendMsg(){
      this.socketSend()
      this.msg=''
    },
    socketOpen(){
      console.log('链接成功')
      // this.heartCheck.reset()
      // this.heartCheck.start()
      let msg ={
        msgType: msgType.ON_LINE,
        sendUser: this.$store.state.userInfo.payload
      }
      setTimeout(()=>{
        console.log(this.socket)
        this.socket.send(JSON.stringify(msg))
      },1000)

    },
    socketError(e){
      console.error('发生错误')
      console.error(e)
      // this.socketReconnect()
    },
    socketSend(){
      let msgRequest={
        msgType: msgType.TEXT_MSG,
        sendUser: this.userInfo,
        msgContent: {
          msgContent: this.msg
        }
      }
      console.log(this.$store.state.userInfo.payload)
      this.socket.send(JSON.stringify(msgRequest))
    },
    socketGetMsg(msg){
      let data= JSON.parse(msg.data)
      this.data.push(data)
      // if (data.msgContent!='hb_request' && data.msgContent!='heartBeat'){
        // this.heartCheck.reset()
        // this.heartCheck.start()
      // }

    },
    socketClose(){
      console.warn('链接关闭')
      // this.heartCheck.reset()
      // this.socketReconnect()
    },
    // heartCheckRest(){
    //   this.heartCheck.timeoutObj=null
    //   this.heartCheck.serverTimeoutObj=null
    // },
    // socketReconnect(){
    //   var lockReconnect = false, tt;
    //   if (lockReconnect) {
    //     return;
    //   }
    //   lockReconnect = true;
    //   tt && clearTimeout(tt);
    //   let that=this
    //   tt = setTimeout(function () {
    //     console.log('重连中...');
    //     lockReconnect = false;
    //     that.socketInit();
    //   }, 4000);
    // },
    // heartCheckStart(){
    //   let self=this.heartCheck
    //   this.heartCheck.timeout&&clearTimeout(this.heartCheck.timeoutObj)
    //   this.heartCheck.serverTimeoutObj&&clearTimeout(this.heartCheck.serverTimeoutObj)
    //   this.heartCheck.timeoutObj=setTimeout(()=>{
    //     console.log('当前ws状态:'+this.socket.readyState)
    //     if (this.socket.readyState !=1){
    //       return
    //     }
    //     this.socket.send("heartBeat")
    //     self.serverTimeoutObj=setTimeout(()=>{
    //       this.socket.close()
    //     },self.timeout)
    //   },this.heartCheck.timeout)
    // },
    selectEmoji(e){
      this.msg+=e.data
    },
    uploadFile(info){
      this.msg+=info.fileList[0].thumbUrl
    },
    beforeUpload(file){
      console.log(typeof (file));
    }
  }
}
</script>

<style scoped>

</style>