<template>
  <div style="padding:30px;">
    <el-table
      ref="video_list"
      :data="infos"
      style="width: 100%"
      height="500"
      :border="true"
      :stripe="true"
    >
      <el-table-column prop="id" label="视频id" />
      <el-table-column prop="name" label="视频名称" />
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import { videoList } from '@/api/manage'
import store from '@/store'
export default {
  name: 'ItemList',
  data() {
    return {
      infos: []
    }
  },
  created() {
    this.VideoList()
    console.log('-----')
  },
  methods: {
    test: function() {

    },
    VideoList: function() {
      videoList(store.getters.farmname).then(response => {
        console.log(response)
        this.infos = response.data
      })
    }
  }
}
</script>

