<template>
<div>
  <a-row style="margin-top: 10px">
    <a-col span="8" offset="8" style="display:flex;flex-direction: row;align-items: center">
<!--      <a-input-search placeholder="搜索你要的歌曲" @search="onSearch"  v-model="search"/>-->
      <a-auto-complete
          class="certain-category-search"
          dropdown-class-name="certain-category-search-dropdown"
          :dropdown-match-select-width="false"
          :dropdown-style="{ width: '300px' }"
          size="large"
          style="width: 100%"
          placeholder="搜索你要的歌曲"
          option-label-prop="value"
          v-model="search"
      >
        <template slot="dataSource">
          <a-select-opt-group v-for="group in searchHis" :key="group">
<!--          <span slot="label">-->
<!--            {{ group }}-->
<!--            <a-->
<!--                style="float: right"-->
<!--                href="https://www.google.com/search?q=antd"-->
<!--                target="_blank"-->
<!--                rel="noopener noreferrer"-->
<!--            >more-->
<!--            </a>-->
<!--          </span>-->
            <a-select-option :key="group" :value="group">
              {{ group }}
<!--              <span class="certain-search-item-count">{{ group }}</span>-->
            </a-select-option>
          </a-select-opt-group>
<!--          <a-select-option key="all" disabled class="show-all">-->
<!--            <a-->
<!--                href="https://www.google.com/search?q=ant-design-vue"-->
<!--                target="_blank"-->
<!--                rel="noopener noreferrer"-->
<!--            >-->
<!--              View all results-->
<!--            </a>-->
<!--          </a-select-option>-->
        </template>
      </a-auto-complete>
      <a-button type="primary" style="margin-left: 10px" @click="onSearch">
        搜索
      </a-button>
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
</div>
</template>

<script>
import player from "@/view/player";
import {getSearchHis} from "@/api/axios";
// import Player from "@/view/player";
export default {
  name: "choose_song",
  // components: {Player},
  comments:[player],
  data(){
    return{
      search:'',
      searchHis:[],
      // topSongs:null
      searchResult:null
    }
  },
  mounted() {
    // this.$axios.getTopSongs().then(resp=>{
    //   console.log(resp.data)
    //   this.topSongs=resp.data
    // })
    this.getSearchHis()
  },
  methods:{
    onSearch(){
      if (!this.search){
        return
      }
      let q={
        key:this.search
      }
      this.$axios.searchMusic(q).then(resp=>{
        this.searchResult=resp.data
        console.log(this.searchResult)
      })
      // console.log(this.search)
    },
    onPlaySong(song){
      console.log(song)
      let q={
        songMid:song.songmid
      }
      this.$axios.getSongPlayUrl(q).then(resp=>{
        console.log(resp.data)
        this.$router.push({
          path:'chat',
          query:{
            albummid:song.albummid,
            playUrl:resp.data.req_0.data.midurlinfo[0].purl,
            songMid:song.songmid
          }
        })
        // let routeData=this.$router.resolve({
        //   path:'/player',
        //   query:{
        //     albummid:song.albummid,
        //     playUrl:resp.data.req_0.data.midurlinfo[0].purl,
        //     songMid:song.songmid
        //   }
        // })
        // window.open(routeData.href,'_blank')
      })
    },
    getSearchHis(){
      getSearchHis().then(resp=>{
        this.searchHis=resp.data
      })
    }
  }
}
</script>

<style scoped>

</style>