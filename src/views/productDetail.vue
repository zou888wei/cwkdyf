<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-9/12">
          <div class="text-lg inline-block"><div class="mb-5">产品中心</div><el-divider class="m-0 c-divider" /></div>
          <el-divider class="m-0" />
          <div class="flex my-5">
            <div class="w-5/12">
              <div class="border border-solid border-gray-300 bg-white" style="min-height:320px">
                <img :src="active" :alt="options.carouselSrc[0].title" :key="options.form.name">
              </div>
              <div class="flex">
                <div class="w-3/12">
                  <div class="table h-full">
                    <a class="table-cell align-middle text-5xl"><i class="el-icon-arrow-left"></i></a>
                  </div>
                </div>
                <div class="w-6/12" v-for="(item, index) in options.carouselSrc" :key="index">
                  <a class="inline-block py-2" @mousemove="active = item.img">
                    <img :src="item.img" :alt="item.title" class="border-2 border-solid border-transparent" :class="{'border-red-500': active == item.img}">
                  </a>
                </div>
                <div class="w-3/12">
                  <div class="table h-full">
                    <a class="table-cell align-middle text-5xl"><i class="el-icon-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-7/12 px-5">
              <h2 class="text-xl font-bold mb-5">{{options.form.title}}</h2>
              <p>规格：{{options.form.specification}}</p>
            </div>
          </div>
          <div class="w-full mb-5">
            <el-tabs v-model="activeName">
              <el-tab-pane label="商品信息" name="info">
                <el-form :model="options.form" label-width="80px" size="mini" class="form-style">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="商品名称">
                        <p class="ml-5">{{options.form.name}}</p>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="批准文号">
                        <p class="ml-5">{{options.form.approval}}</p>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="产品规格">
                        <p class="ml-5">{{options.form.specification}}</p>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="options.form.type">
                      <el-form-item label="药品类型">
                        <p class="ml-5">{{options.form.type}}</p>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="options.form.person">
                      <el-form-item label="适用人群" class="mb-0">
                        <p class="ml-5">{{options.form.person}}</p>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="生产厂家" class="mb-0">
                        <p class="ml-5">{{options.form.factory}}</p>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
                <el-divider />
                <div class="w-full bg-white">
                  <a v-for="(item, index) in options.detailSrc" :key="index">
                    <img :src="item.img" :alt="item.title">
                  </a>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <div class="w-60 ml-5">
          <img src="./img/hb.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data(){
    return {
      options: {},
      activeName: "info",
      active: require('./img/yp' + this.$router.currentRoute.params.id + '-1.jpg'),
      yp11: require('./img/yp1-1.jpg'),
      yp12: require('./img/yp1-2.jpg'),
      yp13: require('./img/yp1-3.jpg'),
      yp14: require('./img/yp1-4.jpg'),
      yp15: require('./img/yp1-5.jpg'),
      yp21: require('./img/yp2-1.jpg'),
      yp22: require('./img/yp2-2.jpg'),
      yp23: require('./img/yp2-3.jpg'),
      yp24: require('./img/yp2-4.jpg'),
      yp25: require('./img/yp2-5.jpg'),
      yp26: require('./img/yp2-6.jpg'),
      yp31: require('./img/yp3-1.jpg'),
      yp32: require('./img/yp3-2.jpg'),
      yp33: require('./img/yp3-3.jpg'),
      yp34: require('./img/yp3-4.jpg'),
      yp35: require('./img/yp3-5.jpg'),
      yp36: require('./img/yp3-6.jpg'),
      yp41: require('./img/yp4-1.jpg'),
      yp42: require('./img/yp4-2.jpg'),
      yp43: require('./img/yp4-3.jpg'),
      yp44: require('./img/yp4-4.jpg'),
      yp45: require('./img/yp4-5.jpg'),
      yp51: require('./img/yp5-1.jpg'),
      yp52: require('./img/yp5-2.jpg'),
      yp53: require('./img/yp5-3.jpg'),
      yp54: require('./img/yp5-4.jpg')
    }
  },
  created(){
    this.init()
  },
  methods:{
    init(){
      let str = require("./json/yp" + this.$router.currentRoute.params.id + ".json")
      for(let i in str){
        if(i == "carouselSrc" || i == "detailSrc"){
          this.options[i] = []
          str[i].forEach(v => {
            this.options[i].push({img: this['yp'+ this.$router.currentRoute.params.id + '' + v], title: str.form.name})
          })
        }else{
          this.options[i] = str[i]
        }
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