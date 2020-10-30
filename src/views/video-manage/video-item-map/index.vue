<template>
  <div>
    <el-container>
      <el-header>
        <li>所选商品:{{ selectedItem.name }}</li>

        <image :src="picUrl" />
      </el-header>
      <el-container>
        <el-aside width="600px">
          <li>选择商品</li>
          <div v-for="item in itemsInfo">
            <el-button class="item_name" @click="choseItem(item)">{{ item.name }}</el-button>
          </div>
        </el-aside>
        <el-main>
          <li>选择视频</li>
          <el-checkbox-group v-model="selectedVideo" @change="onChange">
            <el-checkbox v-for="video in videosInfo" :key="video.id" :label="video.id" border style="display:block;">
              {{ video.id }}.{{ video.name }}:{{ video.description }}
            </el-checkbox>
          </el-checkbox-group>

        </el-main>
      </el-container>
    </el-container>
    <el-button style="top:200px" class="" @click="onSubmit()">
      绑定视频
    </el-button>

  </div>

</template>

<script>
import axios from 'axios'
import { videoList } from '@/api/manage'
import { itemList } from '@/api/manage'
import { VIMap } from '@/api/manage'
import store from '@/store'
import qs from 'qs'
export default {
  name: 'VIMap',
  data() {
    return {
      itemsInfo: [],
      videosInfo: [],
      targetVideos: [],
      selectedVideo: [],
      showItem: true,
      selectedItem: {},
      picUrl: ''
    }
  },
  created() {
    console.log('---init----', this.$route.params)

    this.init()
  },
  methods: {
    onSubmit: function(e) {
      var videoids = []
      for (var video in this.selectedVideo) {
        videoids.push(video)
      }
      console.log('----ids----', videoids, this.selectedVideo)
      var param = qs.stringify({
        videoids: this.selectedVideo,
        itemid: this.selectedItem.id,
        farmname: store.getters.farmname
      })
      console.log('---param---', param)
      axios.post('https://qingjiao.shop:8000' + '/api/VIMap/', param).then(res => {
        console.log(res)
        alert('绑定成功')
      })
    },

    onChange: function(e) {
      console.log(this.selectedVideo)
    },

    choseItem: function(e) {
      this.selectedItem = e
      console.log(e)
      this.picUrl = 'http://qingjiao.shop:8000/static/pic/' + e.pic_address
    },
    init: function() {
      this.VideoList()
      this.ItemList()
    },
    test: function(e) {

    },
    select: function() {
      console.log(this.selectedVideo)
    },
    VideoList: function() {
      const farmname = store.getters.farmname
      console.log(farmname)
      videoList(store.getters.farmname).then(response => {
        this.videosInfo = response.data
        console.log('----videodata----', this.videosInfo)
      })
    },
    ItemList: function() {
      itemList(store.getters.farmname).then(response => {
        console.log('itemdata', response.data)
        this.itemsInfo = response.data
      })
    }
  }
}
</script>

<style scoped>
.item_name{
  width:15%
}
.el-checkbox{
  margin-left:0px;
}
.el-checkbox{
  margin-right:25px;
}
</style>
