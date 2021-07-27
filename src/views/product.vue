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
          <div class="flex mb-5 mt-5">
            <div class="w-1/3">
              <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/1/小儿感冒颗粒' })">
                <img class="mb-2" src="./img/yp1-1.jpg" alt="">
                <div class="text-center mb-2">葫芦娃 小儿感冒颗粒</div>
                <div class="text-center mb-2">规格：6g * 10袋</div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/2/克咳片' })">
                <img class="mb-2" src="./img/yp2-1.jpg" alt="">
                <div class="text-center mb-2">葫芦娃 克咳片</div>
                <div class="text-center mb-2">规格：0.46g * 9片 * 2板</div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/3/小儿肺热咳喘颗粒' })">
                <img class="mb-2" src="./img/yp3-1.jpg" alt="">
                <div class="text-center mb-2">葫芦娃 小儿肺热咳喘颗粒</div>
                <div class="text-center mb-2">规格：4g * 10袋</div>
              </div>
            </div>
          </div>
          <div class="flex mb-5">
            <div class="w-1/3">
              <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/4/维生素C含片' })">
                <img class="mb-2" src="./img/yp4-1.jpg" alt="">
                <div class="text-center mb-2">百合康牌 维生素C含片</div>
                <div class="text-center mb-2">规格：1.2g * 100片</div>
              </div>
            </div>
            <div class="w-1/3">
              <div class="mr-5 bg-white border border-solid border-gray-300" @click="$router.push({ path: '/productDetail/5/万痛筋骨贴' })">
                <img class="mb-2" src="./img/yp5-1.jpg" alt="">
                <div class="text-center mb-2">冠安堂 万痛筋骨贴</div>
                <div class="text-center mb-2">规格：7cm * 10cm * 3贴/袋 * 2袋/盒</div>
              </div>
            </div>
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

<style scoped>
.c-divider {
  background-color: #B91C1C !important;
}
</style>