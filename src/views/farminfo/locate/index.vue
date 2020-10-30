
<template>
  <div class="content">
    <div class="amap-wrapper">
      <el-amap-search-box v-model='address' class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap 
          ref="map" 
          vid="amapDemo" 
          :amap-manager="amapManager"
          :center="center"
          :zoom="zoom"
          :plugin="plugin"
          :events="events"
          class="amap-demo">
          <el-amap-marker vid="amapDemo" :position="center"></el-amap-marker>
          <el-amap-marker v-for="(marker, index) in markers" :position="[marker.lng,marker.lat]" :events="marker.events" :vid="index"></el-amap-marker>
          </el-amap-marker>
      </el-amap>

      <div class="toolbar" style="display:block;text-align:center;">
        <!-- 当前坐标: {{ lng }}, {{ lat }} -->
        地址: {{ res.address }};
        经纬度: {{res.lng}},{{res.lat}}
        <br>
        <el-button  type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import AMap from "vue-amap";
  
  import axios from 'axios';
// import func from '../../../../vue-temp/vue-editor-bridge';
  let amapManager = new AMap.AMapManager();
  export default {
    created: function(){
        this.res.address = this.$route.query.address
        
    },
    data: function() {
      return{
        searchOption: {
          city: '杭州',
          citylimit: false
        },
        markers:[],
        amapManager,
        zoom: 12,
        center: [119.84, 30.34],
        res: {
            address:'',
            lng:119.84,
            lat:30.34
        },
        events: {
          init: o => {
            console.log(o.getCenter());
            // console.log(this.$refs.map.$$getInstance());
            o.getCity(result => {
              console.log('getCity',result);
              });
          },
          moveend: () => {},
          zoomchange: () => {},
          click: e => {
            console.log('e',e.lnglat);
            this.center = [e.lnglat.lng, e.lnglat.lat];//点击选择新地址为中心点
            const msg = {
              key: '29d74ffb2c5caf288589ffdd709ca632',
              location: this.center.join()
            };
            axios({
              url: 'https://restapi.amap.com/v3/geocode/regeo',
              method: 'GET',
              params: msg,
            }).then(function (response) {
              
              console.log('response.data',response.data);
              let d =response.data.regeocode;
            if (d) {
              this.address = d.formatted_address;  //点击选择新地址并获取地址的名称
            }
        }).catch(function (error) {
            console.log(error);
            })
            
          }
        },
        plugin: [
          "ToolBar",
          {
            pName: "MapType",
            defaultType: 0,
            events: {
              init(o) {
                console.log(o);
              }
            }
          }
        ],
      }
    },
    methods: {
    
      onSearchResult(pois) {
          console.log('pois',pois)
          let latSum = 0;
          let lngSum = 0;
          this.markers=pois
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.center = [center.lng, center.lat];
          }
          this.res.address=pois[0].address+pois[0].name
          this.res.lng = pois[0].lng
          this.res.lat = pois[0].lat
        // this.displayMarkers()
      },
      displayMarkers:function(){
        
      },
      confirm:function(e){
        console.log('confirm')
        this.$router.push({path:'/farminfo/update',query:{loc:this.res}})
      }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
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
    .button{
        position: relative;
    }
</style>
