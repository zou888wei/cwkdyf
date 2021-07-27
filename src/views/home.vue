<template>
  <div>
    <div class="nav clear">
      <a class="zhichou vivify popIn" @click="onButtonClick('about')">
        <!-- <div class="watermark blue">关于我们</div> -->
        <!-- <logo type="zhongtai"></logo> -->
        <div style="font-size:32px">关于我们</div>
        <!-- <logo class="mobile" type="mzhichou"></logo> -->
        <h3>孝感诚维康大药房有限公司</h3>
        <h4>是一家中西结合的大药房</h4>
        <h4>成立于2007年>></h4>
      </a>
      <a class="hr vivify popIn delay-200" @click="onButtonClick('culture')">
        <!-- <div class="watermark green">企业文化</div> -->
        <div style="font-size:32px">企业文化</div>
        <!-- <logo class="mobile" type="mhr"></logo> -->
        <h3>最贵的药不一定最好</h3>
        <h4>最便宜的药不一定最经济</h4>
        <h4>正确、安全、合理的用药,才是您最需要的>></h4>
      </a>
      <a class="plus vivify popIn delay-400" @click="onButtonClick('news')">
        <!-- <div class="watermark blue">新闻资讯</div> -->
        <div style="font-size:32px">新闻资讯</div>
        <!-- <logo class="mobile" type="mplus"></logo> -->
        <h3>售价低至几十元</h3>
        <h4>低价水光针</h4>
        <h4>卖的什么“药”？>></h4>
      </a>
    </div>
    <div class="service w-8/12 flex py-24">
      <div class="w-8/12 mr-5">
        <img src="./img/cwkdyf1.jpg" alt="">
      </div>
      <div class="mr-5">
        <h2 class="text-3xl font-medium mb-2">诚维康大药房简介：</h2>
        <span>孝感诚维康大药房有限公司是一家中西结合的大药房，成立于2007年，一直坚持最贵的药不一定最好，
          最便宜的药不一定最经济，正确、安全、合理的用药，才是您最需要的经营理念为用户提供最优质的服务，
          严格的把控药品来源，打造放心、健康、便民的平价大药房。</span>
      </div>
      <div class="w-4/6">
        <div class="flex">
          <div class="flex border-solid border border-green-500 p-4 mr-5 mb-5">
            <a class="w-5 mr-2"><img src="./img/feature8.png" alt=""></a>
            <p class="tracking-widest">放心</p>
          </div>
          <div class="flex border-solid border border-green-500 p-4 mr-5 mb-5">
            <a class="w-5 mr-2"><img src="./img/feature8.png" alt=""></a>
            <p class="tracking-widest">健康</p>
          </div>
        </div>
        <div class="flex">
          <div class="flex border-solid border border-green-500 p-4 mr-5">
            <a class="w-5 mr-2"><img src="./img/feature8.png" alt=""></a>
            <p class="tracking-widest">养生</p>
          </div>
          <div class="flex border-solid border border-green-500 p-4 mr-5">
            <a class="w-5 mr-2"><img src="./img/feature8.png" alt=""></a>
            <p class="tracking-widest">经济</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { routerLink } from "@/mixins"

export default {
  mixins: [routerLink]
}
</script>