<template>
  <div style="padding:30px;">
     <el-table 
          :data="farmInfo" 
          ref='item_list'
          style="width: 100%"
          height="500"
          :border='true' :stripe='true'>
          <el-table-column label="农场logo" >
            <el-avatar v-bind:src="logourl"></el-avatar>
            </el-table-column>
          <el-table-column prop="farm_name" label="农场名称" >
            </el-table-column>
            <el-table-column prop="farm_address" label="农场地址">
            </el-table-column>
            <el-table-column prop="farm_contact" label="联系人">
            </el-table-column>
            <el-table-column prop="farm_phonenumber" label="联系电话">
            </el-table-column>
            <el-table-column prop="farm_type" label="农场类型">
            </el-table-column>
            <el-table-column prop="farm_description" label="农场描述">
            </el-table-column>
            
        </el-table>
        
  </div>
</template>


<script>
import axios from 'axios'
import { farmInfo } from '@/api/manage'
import store from '@/store'
import GLOGBAL from '@/api/global'
export default {
  name:'farm-info',
  data(){
    return{
      farmInfo:[],
      logourl:''
    }
  },
  created(){
    this.getInfo()
  },
  methods:{
    getInfo:function(){
      farmInfo(store.getters.farmname).then(response =>{
        this.farmInfo = [response.data]
        
        this.logourl = 'https://qingjiao.shop:8000/static/pic/'+ this.farmInfo[0].farm_logo_address
        
      })
    },
  }
}
</script>
