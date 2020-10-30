<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit">

      <el-form-item label="csvfile">
        <input ref="csvfile" type="file" accept=".csv" @change="getFile($event)">
      </el-form-item>
      <el-form-item label="表名">
        <input v-model="form.name">
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form>

  </div>
</template>

<script>
import Axios from 'axios'
const axios = require('axios').default
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
export default {
  data() {
    return {
      form: {
        name: ''
      },
      csvfile: ''
    }
  },
  methods: {
    getFile: function(event) {
      this.csvfile = event.target.files[0]
    },
    onSubmit() {
      this.$message('submit!')
      console.log('onsubmit')
      const cloud = 'https://qingjiao.shop:8000'
      const local = 'http://127.0.0.1:8000/'
      var serverurl = local
      const formData = new FormData()
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.csvfile != '') {
        formData.append('csvfile', this.csvfile)
      }

      this.$message(formData)
      axios.post(serverurl + '/api/csv/', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function(response) {
          alert(JSON.stringify(response.data))
        })
        .catch(function(error) {
          console.log(error)
        })
    }

  }
}
</script>
