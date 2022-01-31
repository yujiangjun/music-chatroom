<template>
<div>
  <a-row>
    <a-col span="8" offset="8">
      <a-input-search placeholder="搜索你要的歌曲" @search="onSearch"  v-model="search"/>
    </a-col>
  </a-row>

  <a-row v-if="searchResult">
    <a-col>
      <a-list item-layout="horizontal" :data-source="searchResult.data.song.list">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-list-item-meta>
            <div slot="title">
              <b>{{item.songname }}
               <a-button type="primary" shape="circle" icon="play-circle" @click="onPlaySong(item)"></a-button>
              </b></div>
            <div slot="description">
              <span>{{item.albumname_hilight}}</span>
              <div v-for="(songitem) in item.singer" :key="songitem.id">{{songitem.name_hilight}}、</div>
            </div>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </a-col>
  </a-row>

<!--  <a-row>-->
<!--    <a-col span="8">-->
<!--      <img :src="topSongs.topinfo.MacDetailPicUrl" style="height: 200px"/>-->
<!--    </a-col>-->
<!--  </a-row>-->
<!--  <a-row >-->
<!--    <a-col span="8">-->
<!--    </a-col>-->
<!--    <a-col span="8" offset="4">-->
<!--      <player cd-img="../assets/audio-bg1.png" src="https://dl.stream.qqmusic.qq.com/C400002O8tgh0Mx1iq.m4a?guid=6530133126&vkey=104CD16DD2295A6206483A56A617AFE781585316EC4190FB8F9F67208C3F3B2798170A00AB6C7479F668F6252E2CEC68293C3060144F6541&uin=&fromtag=66"></player>-->
<!--    </a-col>-->
<!--  </a-row>-->
</div>
</template>

<script>
import player from "@/view/player";
// import Player from "@/view/player";
export default {
  name: "choose_song",
  // components: {Player},
  comments:[player],
  data(){
    return{
      search:'',
      // topSongs:null
      searchResult:null
    }
  },
  mounted() {
    // this.$axios.getTopSongs().then(resp=>{
    //   console.log(resp.data)
    //   this.topSongs=resp.data
    // })
  },
  methods:{
    onSearch(){
      let q={
        key:this.search
      }
      this.$axios.searchMusic(q).then(resp=>{
        this.searchResult=resp.data
        console.log(this.searchResult)
      })
    },
    onPlaySong(song){
      console.log(song)
      let q={
        songMid:song.songmid
      }
      this.$axios.getSongPlayUrl(q).then(resp=>{
        console.log(resp.data)
        let routeData=this.$router.resolve({
          path:'/player',
          query:{
            albummid:song.albummid,
            playUrl:resp.data.req_0.data.midurlinfo[0].purl,
            songMid:song.songmid
          }
        })
        window.open(routeData.href,'_blank')
      })
    }
  }
}
</script>

<style scoped>

</style>