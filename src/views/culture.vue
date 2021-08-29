<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-9/12">
          <el-tabs v-model="activeName">
            <el-tab-pane label="门店展示" name="org">
              <div class="flex mb-5">
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf2.jpg" alt=""></a>
                </div>
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf3.jpg" alt=""></a>
                </div>
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf4.jpg" alt=""></a>
                </div>
              </div>
              <div class="flex mb-5">
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf5.jpg" alt=""></a>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="员工风采" name="person">
              <div class="flex mb-5">
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf6.jpg" alt=""></a>
                </div>
                <div class="w-1/3">
                  <a class="mr-5 block"><img src="./img/cwkdyf7.jpg" alt=""></a>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="w-60 flex flex-col">
          <div><img src="./img/hb.jpg" alt=""></div>
          <div class="text-gray-300" @click="handleGoRoute">18W药品匹配</div>
          <div class="text-gray-300" @click="handleGoRoute2">中药饮片</div>
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
  },
  methods:{
    handleGoRoute(){
      this.$message.warning("正在进入18万数据匹配中，请稍等...")
      this.$router.push('/drugMatching18W')
    },
    handleGoRoute2(){
      this.$message.warning("正在进入中药饮片匹配中，请稍等...")
      this.$router.push('/drugZyyp')
    }
  }
}
</script>