<template>
  <div style="padding:30px;">
     <el-table 
          :data="itemsInfo" 
          ref='item_list'
          style="width: 100%"
          height="500"
          :border='true' :stripe='true'>
          <el-table-column prop="item_name" label="商品名称" >
            </el-table-column>
            <el-table-column prop="catego" label="商品分类">
            </el-table-column>
            <el-table-column prop="item_description" label="商品描述">
            </el-table-column>
            <el-table-column prop="item_price" label="商品定价">
            </el-table-column>
            <el-table-column prop="unit" label="销售规格">
            </el-table-column>
        </el-table>
        
  </div>
</template>

<script>
import axios from 'axios'
import { itemList } from '@/api/manage'
import store from '@/store'
export default {
  name:'item-list',
  data(){
    return{
      itemsInfo:[]
    }
  },
  created(){
    console.log('created')
    this.ItemList()
  },
  methods:{
    ItemList:function(){
      const farmname = store.getters.farmname
      itemList(store.getters.farmname).then(response =>{
        console.log(response.data)
        this.itemsInfo = response.data
      })
      
    }
  }
}
</script>
