
<template>
  <div class="content">
    <div class="amap-wrapper">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
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
      </el-amap>

      <div class="toolbar">
        <!-- 当前坐标: {{ lng }}, {{ lat }} -->
        address: {{ address }}
        <el-button type="primary" @click="select">确定</el-button>

      </div>
    </div>
  </div>
</template>
<script>
  import AMap from "vue-amap";
  import axios from 'axios';
  let amapManager = new AMap.AMapManager();
  export default {
    data: function() {
      return{
        searchOption: {
          city: '杭州',
          citylimit: false
        },
        address:'',
        amapManager,
        zoom: 12,
        center: [119.84, 30.34],
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
              console.log(response);
              console.log(response.data);
              let d = data.regeocode;
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
          console.log(pois)
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
      },
      select(e){
        console.log('select')
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
</style>
