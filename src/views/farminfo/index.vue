
<template>
  <div style="padding:30px;">
    <el-table
      ref="item_list"
      :data="farmInfo"
      style="width: 100%"
      height="500"
      :border="true"
      :stripe="true"
    >
      <el-table-column label="农场logo">
        <el-avatar :src="logourl" />
      </el-table-column>
      <el-table-column prop="name" label="农场名称" />
      <el-table-column prop="address" label="农场地址" />
      
      <el-table-column prop="contact" label="联系人" />
      <el-table-column prop="phonenumber" label="联系电话" />
      <el-table-column prop="type" label="农场类型" />
      <el-table-column prop="description" label="农场描述" />
    </el-table>
  </div>
</template>

<script>
// import axios from 'axios'
import { farmInfo } from '@/api/manage'
import store from '@/store'
// import GLOGBAL from '@/api/global'
export default {
  name: 'FarmUpdate',
  data() {
    return {
      farmInfo: [],
      logourl: ''
    }
  },
  created() {
    var farmInfo = store.getters.farmInfo
    if (!farmInfo) {
      this.getInfo()
    }
  },
  methods: {
    getInfo: function() {
      farmInfo(store.getters.farmname).then(response => {
        this.farmInfo = [response.data]

        this.logourl = 'https://qingjiao.shop:8000/static/pic/' + this.farmInfo[0].farm_logo_address
      })
    }
  }
}
</script>
