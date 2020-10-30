/* eslint-disable */
<template>
  <div class="app-container">
    <el-form ref="form" v-model="form" label-width="120px" @submit.prevent="onSubmit">
      <el-form-item label="农场名称">
        <el-input v-model="form.name" :disabled="true" /> 
      </el-form-item>
      <el-form-item label="农场地址">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="经纬度">
        经度:{{form.lng}}    维度:{{form.lat}}<br>
        <button @click="auto_loc">自动获取</button>
        <button @click="invoke_map">手动选取</button>
      </el-form-item>
      <el-form-item label="农场描述">
        <el-input v-model="form.description" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phonenumber" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.contact" />
      </el-form-item>
      <el-form-item label="农场类型">
        <el-input v-model="form.type" />
      </el-form-item>
      <el-form-item label="农场logo">
        <input ref="picFile" type="file" accept=".jpeg,.png" @change="getFileL($event)">
      </el-form-item>
      <el-button type="primary" @click="onSubmit">提交更新</el-button>
    </el-form>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
const axios = require('axios').default
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'
import store from '@/store'
import { farmUpdate } from '@/api/manage'
import { farmInfo } from '@/api/manage'
import AMap from "vue-amap";

let amapManager = new AMap.AMapManager();
export default {
  
  data() {
    let self = this;
    return {
      form: {
        name: '',
        address: '',
        description: '',
        phonenumber: '',
        contact: '',
        type: '',
        lng:'',
        lat:'',
      },
      logo: ''
    }
  },
  created() {
    console.log(store.getters.farmname)
    this.form.farmname = store.getters.farmname
    
    this.getInfo()
    

  },
  methods: {
    setLoc:function(lnglat){
      var de = lnglat.split(',')
      this.form.lng = de[0]
      this.form.lat = de[1]
    },
    invoke_map:function(){
      console.log('red',this.form.addres)
      this.$router.push({path:'/farminfo/locate',query:{address:this.form.address}})
    },
    auto_loc:function(){
      const msg = {
              key: '29d74ffb2c5caf288589ffdd709ca632',
              address: this.form.address
            };
      axios({
              url: 'https://restapi.amap.com/v3/geocode/geo',
              method: 'GET',
              params: msg,
            }).then((response) => {
              console.log(response.data.geocodes[0].location);
              console.log(response.data);
              let loc = response.data.geocodes[0].location;  
              if (loc) {
                //loc[0] = parseFloat(loc[0]).toFixed(4)
                this.setLoc(loc)
              }
              
            })
    },
    getFileL: function(event) {
      this.logo = event.target.files[0]
    },
    
    getCookie(name) {
      var value = '; ' + document.cookie
      var parts = value.split('; ' + name + '=')
      if (parts.length === 2) return parts.pop().split(';').shift()
    },
    getInfo: function() {
      farmInfo(this.form.farmname).then(response => {
        this.form.name = response.data.name
        this.form.id = response.data.id
        this.form.address = response.data.address
        this.form.contact = response.data.contact
        this.form.description = response.data.description
        this.form.phonenumber = response.data.phonenumber
        var loc = this.$route.query.loc
        if(loc){
          this.form.address = loc.address
          this.form.lng = loc.lng
          this.form.lat = loc.lat
        }
      })

    },
    onSubmit() {
      const cloud = 'https://qingjiao.shop:8000'
      const local = 'http://127.0.0.1:8000/'
      var serverurl = cloud
      const formData = new FormData()
      for (var key in this.form) {
        formData.append(key, this.form[key])
      }
      if (this.logo != '') {
        formData.append('logo', this.logo)
      }

      axios.post(serverurl + '/api/farm/', formData, { headers: { 'X-CSRFToken': this.getCookie('csrftoken'), 'Content-Type': 'application/x-www-form-urlencoded' }})
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

<style scoped lang="scss">
  .amap-wrapper {
    width: 1440px;
    height: 1000px;

  }
   .amap-demo {
      height: 600px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 60px;
    }

    .amap-page-container {
      position: relative;
    }
</style>
