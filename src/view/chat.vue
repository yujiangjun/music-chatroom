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
      msg:''
    }
  },
  methods:{
    sendMsg(){
      this.data.push({
        title: this.msg+this.data.length
      })
      this.msg=''
    }
  }
}
</script>

<style scoped>

</style>