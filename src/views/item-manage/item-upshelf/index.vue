<template>
    <div class="app-container">
        <el-form ref="form" :model="form" label-width="120px" @submit.prevent="onSubmit">
            
            <el-form-item label="产品名称">
                <el-input v-model="form.itemname"/>
            </el-form-item>
            <el-form-item label="农场名称">
                <el-input v-model="form.farmname" disabled="true"/>
            </el-form-item>
            <el-form-item label="产品分类">
                <el-input v-model="form.class"/>
            </el-form-item>
            <el-form-item label="产品价格">
                <el-input v-model="form.price" :change="check_price()"/>
            </el-form-item>
            <el-form-item label="销售规格">
                <el-input v-model="form.size"/>
            </el-form-item>
            <el-form-item label="商品视频">
                <input type="file" ref="videoFile" @change="getFileV($event)" multiple="multiple" class="add-file-right-input" accept=".mp4"/>
            </el-form-item>
            <el-form-item label="商品图片">
                <input type="file" ref="picFile" @change="getFileP($event)" accept=".jpeg,.png"/>
            </el-form-item>
            
            <el-button type="primary" @click="onSubmit">创建商品</el-button>
        </el-form>
        
    </div>
</template>

<script>
import Axios from 'axios'
const axios = require('axios').default;
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
import store from '@/store'
export default {
    data() {
        return {
            form:{
                itemname:'',
                name:'',
                class:'',
                price:'',
                size:'',
                farmname:'',
            },
            video:'',
            pic:'',
        }
    },
    created(){
        this.form.farmname = store.getters.farmname
    },
    
    methods:{
        check_price: function(){
            
            var price = '' + this.form.price;
            
            price = price
            .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
            .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
            .replace('.', '$#$')
            .replace(/\./g, '')
            .replace('$#$', '.')
            .replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); // 只能输入两个小数
            if (price.indexOf('.') < 0 && price != '') {
                // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
                price = parseFloat(price);
                }
            this.form.price = price;
            
        },
        getFileV:function(event){
            this.video=event.target.files[0]
            
        },
        getFileP:function(event){
            this.pic=event.target.files[0]
            
            
        },
        getCookie(name) {
                var value = '; ' + document.cookie;
                var parts = value.split('; ' + name + '=');
                if (parts.length === 2) return parts.pop().split(';').shift()
        },
        onSubmit(){
            this.$message('submit!')
            console.log('onsubmit')
            const cloud='https://qingjiao.shop:8000'
            const local='http://127.0.0.1:8000/'
            var serverurl=local
            let formData = new FormData();
            for (var key in this.form){
                formData.append(key,this.form[key])
            }   
            if (this.video!=''){
                formData.append('video',this.video)
            }
            if (this.pic!=''){
                formData.append('pic',this.pic)
            }

            this.$message(formData)
            axios.post(serverurl+'/api/ZxItem/', formData, {headers: {'X-CSRFToken': this.getCookie('csrftoken'),'Content-Type': 'application/x-www-form-urlencoded'}})
                    .then(function (response) {
                        alert(JSON.stringify(response.data))
                    })
                    .catch(function (error) {
                        console.log(error)
                    })   
            } 

    }
}
</script>