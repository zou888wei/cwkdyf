<!--
  描述：拖放地图组件，默认尺寸是 500 * 300
  接收属性参数：
    lat: 纬度
    lng: 经度
  自定义事件：
    drag: 拖放完成事件
  示例：
    <mapDrag @drag="dragMap" lat="22.574405" lng="114.095388"></mapDrag>
-->
<template>
  <div class="m-map">
    <div id="js-container" class="map">正在加载数据 ...</div>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader"

export default {
  props: ["options"],
  data() {
    return {
      AMap: null,
      marker: null,
      placeSearch: null,
      lnglat: [],
      infoWindow: null
    }
  },

  methods: {
    // 实例化地图
    initMap() {
      // let that = this
      AMapLoader.load({
        key: process.env.VUE_APP_MAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: "1.1", // AMapUI 缺省 1.1
          plugins: ["misc/PositionPicker", "overlay/SimpleMarker"] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: "1.3.2" // Loca 版本，缺省 1.3.2
        }
      })
        .then(AMap => {
          let map = new AMap.Map("js-container", { 
            zoom: 16,
            center: [113.939473,30.932402],
            resizeEnable: true
           })

           // 启用工具条
          AMap.plugin(["AMap.ToolBar"], () => {
            map.addControl(
              new AMap.ToolBar({
                position: "RB"
              })
            )
          })

           // 启用标注功能
          AMap.plugin(["AMap.Marker"], () => {
            this.marker = new AMap.Marker({
              position: new AMap.LngLat(113.939473,30.932402)
            })
          })

          // 设置固定标注
          // this.marker.setMap(map);
          map.add(this.marker)

          // 启用信息弹框
          AMap.plugin(["AMap.InfoWindow"], () => {
            this.infoWindow = new AMap.InfoWindow({
                offset: new AMap.Pixel(0, -25),
                content: "<div class='text-lg mb-2'>诚维康大药房</div><div class='text-gray-500'>地址：孝感市北京路78号</div>"
            });
          })

          // // 启用输入提示
          // AMap.plugin('AMap.Autocomplete', () => {
          //   this.autoComplete= new AMap.Autocomplete({city: '全国'});
          // })

          // // 启用搜索匹配
          // AMap.plugin(["AMap.PlaceSearch"], () => {
          //   this.placeSearch = new AMap.PlaceSearch({
          //     // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
          //     city: '全国'
          //   })
          // })

          
          // this.placeSearch.search("孝感诚维康大药房", (status, result) => {
          //   let str = "<div>" + result.poiList.pois[0].name + "</div>"
                  // str += "<div>位置：" + result.poiList.pois[0].address + "</div>"
          //   this.html.push()
          //   // 搜索成功时，result即是对应的匹配数据
          //   console.log(status, result)
          // })
          this.infoWindow.open(map, this.marker.getPosition())

        })
        .catch(e => {
          console.log(e)
        })
    }
  },
  created() {
    this.initMap()
  }
}
</script>

<style scoped>
.m-map {
  height: 100%;
  position: relative;
}
.m-map /deep/ .map {
  width: 100%;
  height: 100%;
}
.m-map .search {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 285px;
  z-index: 1;
}
.m-map .search input {
  width: 200px;
  background-color: #ffffff;
  line-height: 20px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #d1d5db;
  box-sizing: border-box;
  outline: none;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  -webkit-appearance: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.m-map .search button {
  line-height: 26px;
  background: #fff;
  width: 50px;
  text-align: center;
  position: relative;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  letter-spacing: 0.074625em;
  text-indent: 0.074625em;
  text-transform: uppercase;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  white-space: nowrap;
  outline: none;
  box-shadow: initial;
  transition: initial;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 2.2px;
}
.m-map .result {
  max-height: 300px;
  overflow: auto;
  margin-top: 10px;
}
.m-map .map-address {
  background: #fff;
  padding: 0.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 285px;
  z-index: 1;
  border-radius: 0.25rem;
  box-shadow: 0 2px 6px 0 rgb(114 124 245 / 50%);
}
</style>
