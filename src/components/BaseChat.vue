<template>
<div>
  <a-row style="height: calc(53vh)">
    <a-col span="24">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
              :description="item.msgContent.time"
          >
            <div style="display: flex;" slot="title">
              <b style="font-size: 20px">{{item.sendUser.name}}:</b>
              <div v-html="item.msgContent.msgContent"></div>
            </div>
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
    <a-col span="18" offset="2">
      <div style="display: flex;flex-direction: column">
        <div style="display: flex">
          <a-upload
              :customRequest="upload"
              name="file"
              listType="picture"
              style="display: flex"
              :showUploadList="false"
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
    <a-col span="2">
      <a-button type="primary" style="border-radius: 5px" @click="sendMsg">发送</a-button>
    </a-col>
  </a-row>
</div>
</template>

<script>
import {baseRestUrl, wsUrl} from "@/api/base";
import {msgType} from "@/const";
import {uploadFile} from "@/api/axios";

export default {
  name: "BaseChat",
  data(){
    return{
      data:[],
      msg:'',
      socket: null,
      showEmoji: false, //显示emoji弹框
      userInfo: {},
      uploadUrl: baseRestUrl+'/oss/upload',
    }
  },
  mounted() {
    this.socketInit()
    window.onbeforeunload=()=>this.socket.close();
    this.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(this.userInfo)
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
        sendUser: JSON.parse(sessionStorage.getItem('userInfo'))
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
    upload(file){
      // file 是上传的文件 其内容会在放在下面截图中
      // 后端需要接受的参数是 formData数据，
      const form = new FormData()
      form.append('file', file.file)
      // uploadFile 我自己的接口
      uploadFile(form).then(res => {
        console.log(res)
        if (res.code==200) {
          // 调用组件内方法, 设置为成功状态
          file.onSuccess(res, file.file)
          file.status = 'done'
          console.log(res.data)
          let img=`<img src="${res.data}" style="width: 150px"></img>`
          this.msg+=img
        } else {
          file.onError()
          file.status = 'error'
        }
      })
    }
  }
}
</script>

<style scoped>

</style>