<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="width:80%" @submit.prevent="onSubmit">

      <el-form-item label="产品名称">
        <el-input v-model="form.itemname" />
      </el-form-item>
      <el-form-item label="产品分类">
        <el-input v-model="form.class" />
      </el-form-item>

      <el-form-item label="上架状态">
        <el-radio-group v-model="form.active" @change="changeStatus">
          <el-radio class="radio" label="1">上架</el-radio>
          <el-radio class="radio" label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="售卖模式">
        <el-radio-group v-model="form.selling_mode" @change="chosemode">
          <el-radio class="radio" label="1">只能认领</el-radio>
          <el-radio class="radio" label="2">只能售卖</el-radio>
          <el-radio class="radio" label="0">认领与售卖</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商品视频">
        <input ref="videoFile" type="file" multiple="multiple" class="add-file-right-input" accept=".mp4" @change="getFileV($event)">
      </el-form-item>
      <el-form-item label="商品图片">
        <input ref="picFile" type="file" accept=".jpeg,.png" @change="getFileP($event)">
      </el-form-item>
      认领信息：
      <el-form-item label="认领价格">
        <el-input v-model="form.price_A" :change="check_price()" />
      </el-form-item>
      <el-form-item label="认领规格">
        <el-input v-model="form.unit_A" />
      </el-form-item>
      <el-form-item label="保底产量">
        <el-input v-model="form.guaranteed" />
      </el-form-item>
      <el-form-item label="认领权益">
        <el-input v-model="form.benefit" />

      </el-form-item>
      售卖信息：
      <el-form-item label="售卖价格">
        <el-input v-model="form.price_S" :change="check_price()" />
      </el-form-item>
      <el-form-item label="售卖规格">
        <el-input v-model="form.unit_S" />
      </el-form-item>

      <el-button type="primary" @click="onSubmit">创建商品</el-button>
    </el-form>

  </div>
</template>

<script>
// import Axios from 'axios'
const axios = require('axios').default
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
import store from '@/store'
export default {
  data() {
    return {
      form: {
        itemname: '',
        class: '',
        price_A: '',
        price_S: '',
        unit_A: '',
        unit_S: '',
        guaranteed: '',
        benefit: '',
        farmname: '',
        active: 0,
        mode: 0

      },
      video: '',
      pic: '',
      disable: true

    }
  },
  created() {
    this.form.farmname = store.getters.farmname
  },

  methods: {
    chosemode(e) {
      this.form.mode = e
    },
    changeStatus(e) {
      this.form.active = e
    },
    check_price: function() {
      var price = '' + this.form.price
      price = price
        .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (price.indexOf('.') < 0 && price !== '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseFloat(price)
      }
      this.form.price = price
    },
    getFileV: function(event) {
      this.video = event.target.files[0]
    },
    getFileP: function(event) {
      this.pic = event.target.files[0]
    },
    getCookie(name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    onSubmit() {
      console.log('onsubmit')
      const cloud = 'https://qingjiao.shop:8000'
    //   const local = 'http://127.0.0.1:8000/'
      var serverurl = cloud
      const formData = new FormData()
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.video !== '') {
        formData.append('video', this.video)
      } else {
        alert('请上传商品视频')
      }
      if (this.pic !== '') {
        formData.append('pic', this.pic)
      } else {
        alert('请上传商品图片')
      }
      axios.post(serverurl + '/api/Item/', formData, { headers: { 'X-CSRFToken': this.getCookie('csrftoken'), 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function(response) {
          console.log('----', response.data)
          alert('创建成功')
          this.$router.push({ name: 'item-list' })
        })
        .catch(function(error) {
          console.log(error)
        })
    }

  }
}
</script>
