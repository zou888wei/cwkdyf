<template>
  <div class="w-8/12 m-auto mt-10">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-9/12">
          <div class="flex flex-row mb-5">
            <div class="w-1/2 mr-5">
              <img src="./img/cwkdyf.jpg" alt="">
            </div>
            <div class="w-1/2 mr-5">
              <img src="./img/cwkdyf.jpg" alt="">
            </div>
          </div>
          <div class="flex flex-row mb-5">
            <div class="w-1/2 mr-5">
              <img src="./img/cwkdyf.jpg" alt="">
            </div>
            <div class="w-1/2 mr-5">
              <img src="./img/cwkdyf.jpg" alt="">
            </div>
          </div>
          <div class="mr-5">
            <p>孝感诚维康大药房有限公司成立于2007年，坐落于孝感市北京路78号，是一家民营药店，经历十多年成长，
              一直坚持最贵的药不一定最好，最便宜的药不一定最经济，正确、安全、合理的用药，才是您最需要的经营理念为用户提供最优质的服务，
              打造放心、健康、便民的平价大药房。至此，深受广大客户的信任和依赖。</p>
            <p>孝感诚维康大药房有限公司最初源于诚信维康大药房，寓意“真诚，信任，维护，健康”，严格把控药品来源和质量，用心对待每一位患者，
              不虚假、不盲目的推荐药品，用最合理的、最适合的药品来治疗病情，并随着时代发展，不断完善设备设施，以便能提供更加优质的服务，
              使患者更快的恢复起来！
            </p>
          </div>
        </div>
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