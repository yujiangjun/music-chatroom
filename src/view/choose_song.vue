<template>
<div>
  <a-row>
    <a-col span="8" offset="8">
      <a-input-search placeholder="搜索你要的歌曲" @search="onSearch"  v-model="search"/>
    </a-col>
  </a-row>
  <a-row>
    <a-col span="8">
      <img :src="topSongs.topinfo.MacDetailPicUrl" style="height: 200px"/>
    </a-col>
  </a-row>
  <a-row >
    <a-col span="8">
      <a-list item-layout="horizontal" :data-source="topSongs.songlist" style="height: 350px;overflow: auto;">
        <a-list-item slot="renderItem" slot-scope="item,index">
          <a-list-item-meta>
            <div slot="description">
              <span v-for="singer in item.data.singer" :key="singer.id">{{singer.name}}</span>
            </div>
            <div slot="title">
              <span>{{ (index+1)+"."+item.data.songname }}</span>
              <a-button shape="circle" icon="play-circle"  style="margin-left: 10px"/>
            </div>
<!--            <a slot="title" href="https://www.antdv.com/">{{ (index+1)+"."+item.data.songname }}</a>-->
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
    <a-col span="8" offset="4">
      <player cd-img="../assets/audio-bg1.png" src="https://dl.stream.qqmusic.qq.com/C400002O8tgh0Mx1iq.m4a?guid=6530133126&vkey=104CD16DD2295A6206483A56A617AFE781585316EC4190FB8F9F67208C3F3B2798170A00AB6C7479F668F6252E2CEC68293C3060144F6541&uin=&fromtag=66"></player>
    </a-col>
  </a-row>
</div>
</template>

<script>
import player from "@/view/player";
import Player from "@/view/player";
export default {
  name: "choose_song",
  components: {Player},
  comments:[player],
  data(){
    return{
      search:'',
      topSongs:{}
    }
  },
  mounted() {
    this.$axios.getTopSongs().then(resp=>{
      console.log(resp.data)
      this.topSongs=resp.data
    })
  },
  methods:{
    onSearch(){

    }
  }
}
</script>

<style scoped>

</style>