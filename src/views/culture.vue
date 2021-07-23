<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-9/12">
          <el-tabs v-model="activeName">
            <el-tab-pane label="门店展示" name="org">
              <div class="flex flex-row mb-5">
                <div class="mr-5">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
                <div class="mr-5">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
                <div class="mr-5">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="员工风采" name="person">
              <div class="flex flex-row mb-5">
                <div class="mr-5">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
                <div class="mr-5">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
                <div class="mr-5 invisible">
                  <img src="./img/cwkdyf.jpg" alt="">
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="w-60">
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
      activeName: 'org'
    }
  }
}
</script>