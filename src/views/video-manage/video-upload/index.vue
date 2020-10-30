<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="width:80%" @submit.prevent="onSubmit">

      <el-form-item label="农场名称">
        <el-input v-model="form.farmname" :disabled="disable" />
      </el-form-item>
      <el-form-item label="视频名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="商品视频">
        <input ref="videoFile" type="file" multiple="multiple" class="add-file-right-input" accept=".mp4" @change="getFileV($event)">
      </el-form-item>
      <el-form-item label="视频封面">
        <input ref="coverFile" type="file" multiple="multiple" class="add-file-right-input" accept=".png,.jpeg,.jpg" @change="getCover($event)">
      </el-form-item>
      <el-button type="primary" @click="onSubmit">上传视频</el-button>
    </el-form>
  </div>
</template>

<script>
import Axios from 'axios'
const axios = require('axios').default
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
import store from '@/store'
export default {
  data() {
    return {
      form: {
        desc: '',
        farmname: '',
        name: ''

      },
      video: '',
      cover: '',
      disable: true

    }
  },
  created() {
    this.form.farmname = store.getters.farmname
  },
  methods: {
    getFileV: function(event) {
      this.video = event.target.files[0]
    },
    getCover: function(event) {
      this.cover = event.target.files[0]
    },
    getCookie(name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    onSubmit() {
      this.$message('submit!')
      console.log('onsubmit')
      const cloud = 'https://qingjiao.shop:8000'
      const local = 'http://127.0.0.1:8000/'
      var serverurl = cloud
      const formData = new FormData()
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.video != '') {
        formData.append('video', this.video)
      } else {
        alert('请上传视频文件')
      }
      if (this.cover != '') {
        formData.append('cover', this.cover)
      }
      console.log('----222', formData)
      axios.post(serverurl + '/api/video/', formData, { headers: { 'X-CSRFToken': this.getCookie('csrftoken'), 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function(response) {
          console.log(response)
          alert(response.data.msg)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
