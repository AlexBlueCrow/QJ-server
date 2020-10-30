<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" style="width:80%" @submit.prevent="onSubmit">
      <el-form-item label="商品id">
        <el-input v-model="form.id" :disabled="disable" />
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.itemname" :disabled="disable" />
      </el-form-item>
      <el-form-item label="农场名称">
        <el-input v-model="form.farmname" :disabled="disable" />
      </el-form-item>
      <el-form-item label="商品分类">
        <el-input v-model="form.category" />
      </el-form-item>
      <el-form-item label="上架状态">
        <el-radio-group v-model="form.active" @change="changeStatus">
          <el-radio class="radio" label="1">上架</el-radio>
          <el-radio class="radio" label="0">下架</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="售卖模式">
        <el-radio-group v-model="form.mode" @change="chosemode">
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
        <el-input v-model="form.adopt.price" :change="priceChangeA()" />
      </el-form-item>
      <el-form-item label="认领规格">
        <el-input v-model="form.adopt.unit" />
      </el-form-item>
      <el-form-item label="保底产量">
        <el-input v-model="form.adopt.guaranteed" />
      </el-form-item>
      <el-form-item label="认领权益">
        <el-input v-model="form.adopt.benefit" />

      </el-form-item>
      售卖信息：
      <el-form-item label="售卖价格">
        <el-input v-model="form.sell.price" :change="priceChangeS()" />
      </el-form-item>
      <el-form-item label="售卖规格">
        <el-input v-model="form.sell.unit" />
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交修改</el-button>
      <el-button type="primary" @click="goToList">返回列表</el-button>
      <el-button type="primary" @click="goToVideos">视频管理</el-button>
      <el-button type="primary" @click="deleteItem">删除商品</el-button>
    </el-form>

  </div>
</template>

<script>
import Axios from 'axios'
const axios = require('axios').default
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
import store from '@/store'
import { deleteItem } from '@/api/manage'

const cloud = 'https://qingjiao.shop:8000'
const local = 'http://127.0.0.1:8000/'
var serverurl = cloud

export default {
  data() {
    return {
      form: {
        itemname: '',
        farmname: '',
        category: '',
        id: -1,
        active: 0,
        mode: 0,
        adopt: {},
        sell: {}
      },
      video: '',
      pic: '',
      disable: true
    }
  },
  created() {
    this.form.farmname = store.getters.farmname
    var data = this.$route.params.itemInfo
    console.log(data)
    this.init(data)
  },

  methods: {
    chosemode(e) {
      this.form.mode = e
    },
    changeStatus(e) {
      this.form.active = e
    },
    goToList() {
      this.$router.push({ name: 'item-list' })
    },
    goToVideos() {
      console.log('redi to video')
      this.$router.push({
        name: 'video-item-map',
        params: { itemId: this.form.id }
      })
    },
    check_price: function(price) {
      var res = price
        .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
        .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3') // 只能输入两个小数
      if (price.indexOf('.') < 0 && price != '') {
        // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        price = parseFloat(price)
      }
      return res
    },
    priceChangeA: function() {
      this.form.adopt.price = this.check_price(this.form.adopt.price)
    },
    priceChangeS: function() {
      this.form.sell.price = this.check_price(this.form.sell.price)
    },
    getFileV: function(event) {
      this.video = event.target.files[0]
    },
    getFileP: function(event) {
      this.pic = event.target.files[0]
    },
    init: function(data) {
      this.form = {
        itemname: data.name,
        category: data.category,
        farmname: store.getters.farmname,
        id: data.id,
        active: data.status,
        mode: data.mode,
        sell: {
          price: data.Sell.price,
          unit: data.Sell.unit
        },
        adopt: {
          price: data.Adopt.price,
          unit: data.Adopt.unit,
          benefit: data.Adopt.benefit,
          guaranteed: data.Adopt.guaranteed
        }

      }
      console.log('inited', this.form)
    },
    getCookie(name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    deleteItem() {
      this.$confirm('确认删除该商品', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const itemid = this.form.id
        deleteItem(itemid).then(response => {
          console.log('delete-res', response.data)
        })
        this.$router.push({ name: 'item-list' })
      })
    },
    onSubmit() {
      console.log('onsubmit')
      const formData = new FormData()
      formData.append('test', 'value')

      for (var key in this.form) {
        console.log(key, '===', this.form[key])
        formData.append(key, this.form[key])
      }
      console.log('1', formData)
      if (this.video != '') {
        formData.append('video', this.video)
      }
      if (this.pic != '') {
        formData.append('pic', this.pic)
      }
      console.log('----', formData)
      axios.post(serverurl + '/api/Item_update/', formData, { headers: { 'X-CSRFToken': this.getCookie('csrftoken'), 'Content-Type': 'application/x-www-form-urlencoded' }})
        .then(function(response) {
          console.log(response)
          alert(JSON.stringify(response.data.data.msg))
        }).catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style >

.disabled>>>.el-input__inner{
      font-size: 18px!important;
      color:#000000!important;
      font-family: cursive!important;
  }
</style>
