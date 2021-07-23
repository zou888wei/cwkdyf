<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row w-full">
        <div class="w-1/2 flex flex-row">
          <div class="mr-5"><i class="el-icon-phone-outline text-6xl"></i></div>
          <div>
            <p class="text-lg">客户服务热线/Customer</p>
            <p class="text-2xl">0712-2311949</p>
          </div>
        </div>
        <div class="w-1/2">
          <div class="mt-2">公司地址: 孝感市北京路78号</div>
          <div>联系邮箱: zou888@vip.qq.com</div>
        </div>
      </div>
      <div class="w-full h-96 mt-10">
        <MapDrag />
      </div>
    </div>
  </div>
</template>

<script>
import MapDrag from "./mapDrag"

export default {
  components:{
    MapDrag
  }
}
</script>