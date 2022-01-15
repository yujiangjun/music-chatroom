<template>
<div>
  <a-row style="height: 80%">
    <a-col span="24">
      <a-list item-layout="horizontal" :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta
              description="描述"
          >
            <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
            <a-avatar
                slot="avatar"
                src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>
  <a-row>
    <a-col span="17" offset="2">
      <a-textarea placeholder="请输入。。。。" :rows="4" v-model="msg"/>
    </a-col>
    <a-col span="2" offset="1">
      <a-button type="primary" style="border-radius: 5px" @click="sendMsg">发送</a-button>
    </a-col>
  </a-row>
</div>
</template>

<script>
import wsUrl from "@/api/base";
const data = [
  {
    title: '消息1',
  },
  {
    title: '消息 2',
  },
  {
    title: '消息 3',
  },
  {
    title: '消息 4',
  },
];
export default {
  name: "chat",
  data(){
    return{
      data,
      msg:'',
      socket: null,
      heartCheck:{
        timeout:5000,
        timeoutObj:null,
        serverTimeoutObj:null,
        reset:this.heartCheckRest,
        start:this.heartCheckStart
      }
    }
  },
  mounted() {
    this.socketInit()
    window.onbeforeunload=()=>this.socket.close();
  },
  methods:{
    socketInit(){
      this.socket=new WebSocket(wsUrl)
      this.socket.onpen=this.socketOpen
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
      this.heartCheck.reset()
      this.heartCheck.start()
    },
    socketError(e){
      console.error('发生错误')
      console.error(e)
      this.socketReconnect()
    },
    socketSend(){
      this.socket.send(this.msg)
    },
    socketGetMsg(msg){
      console.log(msg)
      if (msg!='hb_request' && msg.data!='heartBeat')
      this.data.push({
        title: msg.data
      })
      this.heartCheck.reset()
      this.heartCheck.start()
    },
    socketClose(){
      console.warn('链接关闭')
      this.heartCheck.reset()
      this.socketReconnect()
    },
    heartCheckRest(){
      this.heartCheck.timeoutObj=null
      this.heartCheck.serverTimeoutObj=null
    },
    socketReconnect(){
      var lockReconnect = false, tt;
      if (lockReconnect) {
        return;
      }
      lockReconnect = true;
      tt && clearTimeout(tt);
      let that=this
      tt = setTimeout(function () {
        console.log('重连中...');
        lockReconnect = false;
        that.socketInit();
      }, 4000);
    },
    heartCheckStart(){
      let self=this.heartCheck
      this.heartCheck.timeout&&clearTimeout(this.heartCheck.timeoutObj)
      this.heartCheck.serverTimeoutObj&&clearTimeout(this.heartCheck.serverTimeoutObj)
      this.heartCheck.timeoutObj=setTimeout(()=>{
        console.log('当前ws状态:'+this.socket.readyState)
        if (this.socket.readyState !=1){
          return
        }
        this.socket.send("heartBeat")
        self.serverTimeoutObj=setTimeout(()=>{
          this.socket.close()
        },self.timeout)
      },this.heartCheck.timeout)
    }
  }
}
</script>

<style scoped>

</style>