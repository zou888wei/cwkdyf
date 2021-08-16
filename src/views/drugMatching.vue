<template>
<div class="p-4">
  <div>
    <el-collapse v-model="active">
      <el-collapse-item :name="1">
        <template slot="title">
          <div class="text-xl">
            <i class="header-icon el-icon-upload"></i>
            <span class="font-bold">导入文件列表</span>
          </div>
        </template>
        <div class="flex flex-row pb-2">
          <!-- <div class="w-1/4">
            <div>匹配的药品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'pipei_yp')"></div>
          </div> -->
          <div class="w-1/4">
            <div class="text-lg">医保药品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'yibao_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">全部商品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'quanbu_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">中成药</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'zhongchengyao_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">保健品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'baojianpin_yp')"></div>
          </div>
        </div>
        <!-- <div class="flex flex-row pb-2">
          <div class="w-1/4">
            <div>保健品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'baojianpin_yp')"></div>
          </div>
        </div> -->
      </el-collapse-item>
      <el-collapse-item :name="2">
        <template slot="title">
          <div class="text-xl">
            <i class="header-icon el-icon-search"></i>
            <span class="font-bold">默认查询条件</span>
          </div>
        </template>
        <div class="flex flex-row pb-2">
          <div class="w-2/6 flex flex-row">
            <div class="text-lg mr-2">药品类别</div>
            <div>
              <el-select class="w-96" v-model="query.type" multiple placeholder="请选择商品类别" clearable size="small" @change="handlType">
                <el-option
                  v-for="item in typeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="w-1/4 flex flex-row">
            <div class="text-lg mr-2">注册批号</div>
            <div><el-input v-model="query.pihao" placeholder="请输入注册批号" size="small" clearable /></div>
            <div class="ml-2"><el-button type="primary" size="small" @click="handleSearch">查询</el-button></div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>    
  </div>
  <div>
    
  </div>
</div>
</template>

<script>
export default {
  data(){
    return {
      active: [1,2],
      query: {
        pihao: "",
        type: ["quanbu_yp", "zhongchengyao_yp"]
      },
      typeList: [{
        label: "全部商品",
        value: "quanbu_yp"
      },{
        label: "药品(含中成药)",
        value: "zhongchengyao_yp"
      },{
        label: "保健品",
        value: "baojianpin_yp"
      }],
      // pipei_yp: [],
      yibao_yp: [],
      quanbu_yp: [],
      zhongchengyao_yp: [],
      baojianpin_yp: [],
      leftTableData: [],
      rightTableData: []
    }
  },
  methods: {
    handleInfo(res, name){
      let file = res.files[0]
      const FileExt = file.name.replace(/.+\./, "");
      const picArr = ["json"]
      if (picArr.indexOf(FileExt) < 0) {
        this.$message.error('导入文件只能是 json 格式!')
        return false
      }
      let that = this
      let reader = new FileReader();//新建一个FileReader
      reader.readAsText(file, "UTF-8");//读取文件
      reader.onload = function (evt) { //读取完文件之后会回来这里
        let fileString = evt.target.result; // 读取文件内容
        let str = JSON.parse(fileString)
        that[name] = Object.assign([], str)
      }
    },
    handleSearch(){
      if(!this.query.pihao || !this.query.type.length){
        this.$message.error("查询条件不得为空！")
        return false
      }
      if(!this.yibao_yp.length || !this.quanbu_yp.length){
        this.$message.error("请导入默认医保药品和全部商品的json文件！")
        return false
      }
      let leftList = []
      let rightList = []
      rightList = this.yibao_yp.map(res => {
        return res[7].includes(this.query.name)
      })
      this.query.type.forEach(v => {
        if(this[v].length){
          this.$message.error("请导入相应药品类别的json文件！")
          return false
        }
        let str = []
        str = this[v].map(res => {
          return res[9].includes(this.query.name)
        })
        leftList.concat(str)
      })
    },
    handlType(){
      if(this.query.type.length > 2){
        this.$message.error("药品类别最多只能选2个！")
        this.query.type = ["quanbu_yp", "zhongchengyao_yp"]
        return false
      }
      if(!this.query.type.includes("quanbu_yp")){
        this.$message.error("药品类别必须包含全部商品！")
        this.query.type = ["quanbu_yp", "zhongchengyao_yp"]
        return false
      }
    }
  }
}
</script>