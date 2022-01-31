<template>
<div id="components-layout-demo-basic">
  <a-layout>
    <a-layout-sider style="max-width: 150px;width: 150px;min-width: 150px;height: calc(75vh)">
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
          曲库
        </a-button>
      </div>
    </a-layout-sider>
    <a-layout style="height: calc(75vh)">

      <a-layout-content style="height: 100%">
        <router-view style="height: 100%"></router-view>
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
      currentUser:JSON.parse(sessionStorage.getItem('userInfo'))
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
</style>