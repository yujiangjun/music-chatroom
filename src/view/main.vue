<template>
<div id="components-layout-demo-basic">
  <a-layout>
    <a-layout-sider style="max-width: 150px;width: 150px;min-width: 150px;height: calc(80vh)">
      <div style="width: 100%;width: 100%;display: flex;flex-direction: column;flex-wrap: wrap">
        <a-avatar
            :src="currentUser.head"
            style="width: 49px;height: 50px;align-self: center;"
        />
        <a-button type="primary" @click="()=>this.$router.push('/main/chooseSong')">
          点歌
        </a-button>
        <a-button type="primary" @click="()=>this.$router.push('/main/chat')">
          聊天
        </a-button>
        <a-button type="primary" @click="()=>this.$router.push('/main/repertoire')">
          广场
        </a-button>
      </div>
    </a-layout-sider>
    <a-layout style="height: calc(80vh)">

      <a-layout-content class="chat-top">
        <div>当前播放:<b>未播放</b></div>
        <div >当前人数:<b>1</b></div>
        <div >
          <span>房间:<b>默认房间</b></span>
        </div>
      </a-layout-content>
      <a-layout-content style="height: 100%;">
        <router-view style="height: 100%;"></router-view>
<!--        <div style="width: 20%;background-color: bisque;display: flex;flex-direction: column;align-items: flex-start">-->
<!--          <div v-for="item in roomList" :key="item.id">-->
<!--            <img :src="item.roomImg" style="width: 40px;border-radius: 20px"/>-->
<!--            <b style="margin-left: 15px">{{item.roomName}}</b>-->
<!--            <a-button type="primary" style="margin-left: 15px" icon="enter" size="small">进入</a-button>-->
<!--          </div>-->
<!--        </div>-->
      </a-layout-content>
    </a-layout>
  </a-layout>
</div>
</template>

<script>
export default {
  name: "main",
  data(){
    return{
      currentUser:{},
      roomList:[]
    }
  },
  mounted() {
    if (this.$route.query.id
    && this.$route.query.nickName
    && this.$route.query.head) {
      let user={
        id:this.$route.query.id,
        name:this.$route.query.nickName,
        head:this.$route.query.head
      }

      console.log(user)
      sessionStorage.setItem('userInfo',JSON.stringify(user))
    }
    this.currentUser=JSON.parse(sessionStorage.getItem('userInfo'))
    this.getRoomList()
  },
  methods:{
    getRoomList(){
      this.$axios.getRoomList().then(res=>{
        this.roomList=res.data
      })
    }
  }
}
</script>

<style scoped>

#components-layout-demo-basic {
  text-align: center;
  height: calc(75vh);
}
#components-layout-demo-basic .ant-layout-sider {
  background: #3ba0e9;
  color: #fff;
  line-height: 120px;
  width: 10%;
}
#components-layout-demo-basic .ant-layout-content {
  min-height: 120px;
  line-height: 120px;
}
#components-layout-demo-basic > .ant-layout {
  margin-bottom: 48px;
}
#components-layout-demo-basic > .ant-layout:last-child {
  margin: 0;
}

.chat-top{
  height: 30px;
  background-color: white;
  display: flex;
  flex-direction: row-reverse;
}
.chat-top >div{
  margin-right: 50px;
}
</style>