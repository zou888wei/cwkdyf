<template>
  <div class="w-8/12 m-auto">
    <div class="service py-14">
      <div class="flex flex-row">
        <div class="w-9/12">
          <el-collapse v-model="activeNames" class="pr-5">
            <el-collapse-item name="1" disabled>
              <template slot="title">
                <div class="flex flex-row w-full">
                  <div class="px-5 text-gray-900 text-2xl flex-1">
                    售价低至几十元 低价水光针，卖的什么“药”？
                  </div>
                  <div class="mr-8">2021-07-16</div>
                </div>
              </template>
              <div class="px-5">
                <p>颜值经济”正处风口，水光针是很多医美新手的入门级项目。作为“轻医美”的爆款品类，无需动刀、恢复速度快的水光针被商家热推。</p>
                <p>市面上的水光针价格从几十元到几千元不等。价格差别如此之大，背后是否暗藏套路？《工人日报》记者对此进行了调查。
                  <a href="http://news.pharmnet.com.cn/news/2021/07/16/556900.html" target="_blcok">>>></a></p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="2" disabled>
              <template slot="title">
                <div class="flex flex-row w-full">
                  <div class="px-5 text-gray-900 text-2xl flex-1">
                    药店第二次变革或来了
                  </div>
                  <div class="mr-8">2021-07-22</div>
                </div>
              </template>
              <div class="px-5">
                <p>药店行业情况怎么样？根据IQVIA艾昆纬今年一季度显示2021年一季度全国药店销售额同比去年下降了1.4%，
                  也就是说销售额的蛋糕在缩小；但根据国家药监局最新数据显示呢，今年一季度全国新增了7100家药店。</p>
                <p>一边数据显示行业蛋糕越来越小药店日趋艰难，一边有人看好这个行业涌进来争抢蛋糕。</p>
                <p>那药店行业到底是好是坏呢？你从不同的面分析会得到不同答案，行业现状简直成了薛定谔的猫，你说它好就好，反之亦然。
                  <a href="http://news.pharmnet.com.cn/news/2021/07/22/557115.html" target="_blcok">>>></a></p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="3" disabled>
              <template slot="title">
                <div class="flex flex-row w-full">
                  <div class="px-5 text-gray-900 text-2xl flex-1">
                    巨头加入！外卖刷医保扩面
                  </div>
                  <div class="mr-8">2021-07-09</div>
                </div>
              </template>
              <div class="px-5">
                <p>日前，辽宁沈阳首批62家试点定点零售药店正式在外卖平台上开通医保支付购药服务。</p>
                <p>据悉，这是东北首个“互联网%20”医保数字化应用场景，该场景由沈阳市医保局、医保中心与美团买药共同打造，
                  包括成大方圆连锁药店、海王星辰健康药房、国大药房等连锁均参加了相关试点。
                  <a href="http://news.pharmnet.com.cn/news/2021/07/09/556668.html" target="_blcok">>>></a></p>
              </div>
            </el-collapse-item>
            <el-collapse-item name="4" disabled>
              <template slot="title">
                <div class="flex flex-row w-full">
                  <div class="px-5 text-gray-900 text-2xl flex-1">
                    网上药店，即将面临严管
                  </div>
                  <div class="mr-8">2021-07-23</div>
                </div>
              </template>
              <div class="px-5">
                <p>近日，国务院办公厅印发《全国深化“放管服”改革着力培育和激发市场主体活力电视电话会议重点任务分工方案》
                  （以下简称《分工方案》），对深化“放管服”改革优化营商环境工作作出部署。</p>
                <p>《分工方案》强调，对涉及安全生产、人民身体健康和生命安全等领域和事项，切实把好每一道关口，确保质量和安全。</p>
                <p>其中，相关部门要加快制定药品经营、药品网络销售的监督管理办法，强化质量监管，提升监管效能。
                  <a href="http://news.pharmnet.com.cn/news/2021/07/23/557165.html" target="_blcok">>>></a></p>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="w-60 flex flex-col">
          <div><img src="./img/hb.jpg" alt=""></div>
          <div class="text-gray-300" @click="handleGoRoute">药品匹配</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeNames: ['1', '2', '3', '4']
      };
    },
    methods:{
      handleGoRoute(){
        this.$message.warning("正在进入，请稍等...")
        this.$router.push('/drugMatching')
      }
    }
  }
</script>

<style scoped>
p {
  text-indent:30px;
}

.el-collapse >>> .el-collapse-item__arrow {
  display: none;
}

.text-2xl {
  line-height: inherit;
}
</style>