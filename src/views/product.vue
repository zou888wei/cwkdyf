<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-60 mr-5">
          <img src="./img/hb.jpg" alt="">
        </div>
        <div class="w-9/12">
          <div class="text-lg inline-block"><div class="mb-5">产品中心</div><el-divider class="m-0 c-divider" /></div>
          <el-divider class="m-0" />
          <div class="flex flex-wrap mb-5">
            <template v-for="(item, index) in list">
              <div class="w-1/3 mt-5" :key="index">
                <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/' + (index + 1) + '/' + item.name })">
                  <img class="mb-2" :src="item.img" :alt="item.name">
                  <div class="text-center mb-2">{{item.brand + " " + item.name}}</div>
                  <div class="text-center mb-2 text-gray-500">规格：{{item.specification}}</div>
                </div>
              </div>
            </template>
          </div>
          <el-pagination
            class="float-right"
            background
            :current-page="1"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="5">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      list: [],
      yp11: require('./img/yp1-1.jpg'),
      yp21: require('./img/yp2-1.jpg'),
      yp31: require('./img/yp3-1.jpg'),
      yp41: require('./img/yp4-1.jpg'),
      yp51: require('./img/yp5-1.jpg')
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      for(let i = 0; i < 5; i++){
        let str = require("./json/yp" + (i + 1) + ".json")
        this.list.push({name: str.form.name, specification: str.form.specification, brand: str.form.brand, img: this['yp'+ (i + 1) +'1']})
      }
    }
  }
}
</script>

<style scoped>
.c-divider {
  background-color: #B91C1C !important;
}
</style>