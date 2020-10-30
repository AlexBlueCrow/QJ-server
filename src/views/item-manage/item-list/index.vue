<template>
  <div style="padding:30px;">
    <el-table
      ref="item_list"
      :data="itemsInfo"
      style="width: 100%"
      height="500"
      :border="true"
      :stripe="true"
    >
      <el-table-column prop="id" label="商品id" />
      <el-table-column prop="name" label="商品名称" />
      <el-table-column prop="category" label="商品分类" />
      <el-table-column prop="description" label="商品描述" />
      <el-table-column prop="price" label="商品定价" />
      <el-table-column prop="unit" label="销售规格" />
      <el-table-column prop="status" label="正在销售">
        <template slot-scope="scope" @click="test()">{{ !!(scope.row.status==1)?'销售中':'未上架' }}</template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="goToDetail(scope.row)">
            修改
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import { itemList } from '@/api/manage'
import store from '@/store'
export default {
  name: 'ItemList',
  data() {
    return {
      itemsInfo: []
    }
  },
  created() {
    this.ItemList()
  },
  methods: {
    test: function() {
      alert('test')
    },
    ItemList: function() {
      const farmname = store.getters.farmname
      itemList(store.getters.farmname).then(response => {
        console.log('listdata', response.data)
        this.itemsInfo = response.data
      })
    },
    goToDetail: function(itemInfo) {
      this.$router.push({ name: 'item-detail', params: { 'itemInfo': itemInfo }})
    }
  }
}
</script>

