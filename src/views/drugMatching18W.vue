<template>
<div class="p-4" v-loading="loading" element-loading-text="正在加载医保数据，请稍等..."
    element-loading-spinner="el-icon-loading"> 
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
          <div class="w-1/4">
            <div class="text-lg">匹配的药品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'pipei_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">全部商品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'quanbu_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">西药</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'baojianpin_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">中成药</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'zhongchengyao_yp')"></div>
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
            <span class="font-bold">默认查询条件<span class="text-sm">（PS：行号指的是Excel行号，全部商品序号 = 行号 - 2）</span></span>
          </div>
        </template>
        <div class="flex flex-row my-2">
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">药品类别</div>
            <el-select class="w-96" v-model="query.type" multiple placeholder="请选择商品类别" size="small" disabled>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">行号排序</div>
            <el-select v-model="query.sort" placeholder="默认正序" size="small" @change="() => this.handlStorage('sort')" style="width:120px">
              <el-option
                v-for="item in sortList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">匹配药品行号</div>
            <div class="drug-input-number">
              <!-- <el-input-number v-model="query.hanghao" placeholder="请输入行号" size="small" :min="3" @change="v => this.handlStorage('hanghao', v)" style="width:180px" /> -->
              <el-input @change="val => this.handlStorage('hanghao', val)" type="number" v-model="query.hanghao" placeholder="请输入行号" size="small" :min="3" style="width:200px">
                <el-button @click="handlQuick('-')"  slot="prepend" icon="el-icon-minus"></el-button>
                <el-button @click="handlQuick('+')"  slot="append" icon="el-icon-plus"></el-button>
              </el-input>
            </div>
          </div>
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">注册批号</div>
            <div><el-input v-model="query.pihao" placeholder="请输入注册批号" size="small" clearable /></div>
          </div>
          <div class="ml-2"><el-button type="primary" size="small" @click="handleSearch">查询</el-button></div>
        </div>
      </el-collapse-item>
    </el-collapse>    
  </div>
  <div v-if="leftTableData.length" class="mt-5">
    <div class="text-xl font-bold">智慧脸药品列表</div>
    <el-table
      class="zhl-table-style"
      :data="leftTableData"
      border
      @row-click="handlCopyZhl"
      :key="'left' + query.pihao"
      style="width: 100%">
      <template v-for="(item, index) in leftHeaders">
        <el-table-column v-bind="item" :key="'left' + index"></el-table-column>
      </template>
    </el-table>
  </div>
  <div v-if="rightTableData.length" class="mt-5">
    <div class="text-xl font-bold">医保药品列表</div>
    <el-table
      :data="rightTableData"
      border
      stripe
      :key="'right' + query.pihao"
      @row-click="handlCopyYb"
      style="width: 100%">
      <template v-for="(item, index) in rightHeaders">
        <el-table-column v-bind="item" :key="'right' + index"></el-table-column>
      </template>
    </el-table>
  </div>
</div>
</template>

<script>
import Storage from "good-storage"
// import Clipboard from 'clipboard';
// import ybyp1 from "../../static/json/ybyp1.json"
// import ybyp2 from "../../static/json/ybyp2.json"
// import ybyp3 from "../../static/json/ybyp3.json"
// import ybyp4 from "../../static/json/ybyp4.json"
// import ybyp5 from "../../static/json/ybyp5.json"
// import ybyp6 from "../../static/json/ybyp6.json"
// import ybyp7 from "../../static/json/ybyp7.json"
// import ybyp8 from "../../static/json/ybyp8.json"
// import ybyp9 from "../../static/json/ybyp9.json"
// import ybyp10 from "../../static/json/ybyp10.json"
// import ybyp11 from "../../static/json/ybyp11.json"
// import ybyp12 from "../../static/json/ybyp12.json"
// import ybyp13 from "../../static/json/ybyp13.json"
// import ybyp14 from "../../static/json/ybyp14.json"
// import ybyp15 from "../../static/json/ybyp15.json"
// import ybyp16 from "../../static/json/ybyp16.json"
export default {
  data(){
    return {
      loading: false,
      active: [1,2],
      query: {
        pihao: "",
        index: 0,
        hanghao: 3,
        sort: 0,
        type: ["quanbu_yp", "zhongchengyao_yp", "baojianpin_yp"]
      },
      typeList: [{
        label: "全部商品",
        value: "quanbu_yp"
      },{
        label: "中成药",
        value: "zhongchengyao_yp"
      },{
        label: "西药",
        value: "baojianpin_yp"
      }],
      sortList: [{
        label: "正序",
        value: 0
      },{
        label: "倒序",
        value: 1
      }],
      // yibao_yp1: ybyp1,
      // yibao_yp2: ybyp2,
      // yibao_yp3: ybyp3,
      // yibao_yp4: ybyp4,
      // yibao_yp5: ybyp5,
      // yibao_yp6: ybyp6,
      // yibao_yp7: ybyp7,
      // yibao_yp8: ybyp8,
      // yibao_yp9: ybyp9,
      // yibao_yp10: ybyp10,
      // yibao_yp11: ybyp11,
      // yibao_yp12: ybyp12,
      // yibao_yp13: ybyp13,
      // yibao_yp14: ybyp14,
      // yibao_yp15: ybyp15,
      // yibao_yp16: ybyp16,
      yibao_yp1: [],
      yibao_yp2: [],
      yibao_yp3: [],
      yibao_yp4: [],
      yibao_yp5: [],
      yibao_yp6: [],
      yibao_yp7: [],
      yibao_yp8: [],
      yibao_yp9: [],
      yibao_yp10: [],
      yibao_yp11: [],
      yibao_yp12: [],
      yibao_yp13: [],
      yibao_yp14: [],
      yibao_yp15: [],
      yibao_yp16: [],
      yibao_yp17: [],
      yibao_yp18: [],
      pipei_yp: [],
      quanbu_yp: [],
      zhongchengyao_yp: [],
      baojianpin_yp: [],
      leftTableData: [],
      rightTableData: [],
      leftHeaders: [
        {
          label: "总序号",
          align: "center",
          prop: "xh"
        },
        {
          label: "商品分类",
          align: "center",
          prop: "spfl"
        },
        {
          label: "分序号",
          align: "center",
          prop: "fxh"
        },
        {
          label: "通用名称",
          align: "center",
          prop: "tymc"
        },
        {
          label: "商品编号",
          align: "center",
          prop: "spbm"
        },
        {
          label: "规格/型号",
          align: "center",
          prop: "gg"
        },
        {
          label: "基本单位",
          align: "center",
          prop: "jbdw"
        },
        {
          label: "基本单位条形码",
          align: "center",
          prop: "txm"
        },
        {
          label: "商品名称",
          align: "center",
          prop: "spmc"
        },
        {
          label: "批准文号",
          align: "center",
          prop: "pzwh"
        },
        {
          label: "生产厂家",
          align: "center",
          prop: "sccj"
        }
      ],
      rightHeaders: [
        {
          label: "医保文档行号",
          align: "center",
          prop: "xh",
          formatter: row => {
            return "A" + (Number(row.xh) + 2)
          }
        },
        {
          label: "序号",
          align: "center",
          prop: "xh"
        },
        {
          label: "注册名称",
          align: "center",
          prop: "zcmc"
        },
        {
          label: "商品名称(品牌)",
          align: "center",
          prop: "spmc"
        },
        {
          label: "注册规格",
          align: "center",
          prop: "zcgg"
        },
        {
          label: "实际规格",
          align: "center",
          prop: "sjgg"
        },
        {
          label: "最小包装数量",
          align: "center",
          prop: "bzsl"
        },
        {
          label: "最小制剂单位",
          align: "center",
          prop: "zjdw"
        },
        {
          label: "药品企业",
          align: "center",
          prop: "ypqy"
        },
        {
          label: "批准文号",
          align: "center",
          prop: "pzwh"
        }
      ],
      leftHeight: 0,
      rightHeight: 0,
      timer: "",
      index: 0,
      copys:""
    }
  },
  mounted(){
    if (this.timer) {
      clearInterval(this.timer)
      this.index = 0
    }
    let that = this
    this.$nextTick(() => {
      this.asyncPrint(this.init(), 0)
      // 空格与~监听
      document.onkeydown = function(e){
        let el = e || event || window.event || arguments.callee.caller.arguments[0]
        if(el && el.code == 'Space'){
          that.handlQuick('+')
        }else if(el && el.code == 'Backquote'){
          that.handlQuick('-')
        }
      }
    })
  },
  methods: {
    async asyncPrint(value, ms) {
      await this.timeout(ms)
    },
    timeout(ms){
      return new Promise((resolve) => {
        setTimeout(resolve, ms);
      })
    },
    async init(){
      this.loading = true
      this.timer = setInterval(await this.handleTime, 100)
    },
    handleTime(){
      this.index++
      if(this.index > 18){
        clearInterval(this.timer)
        this.index = 0
        this.loading = false
        return false
      }
      this['yibao_yp' + this.index] = require("../../static/json18/ybyp" + this.index + ".json")
    },
    handleInfo(res, name){
      let file = res.files[0]
      if(!file){
        this[name] = []
        this.$message.warning("已清空该数据，请重新选择对应文件导入！")
        return false
      }
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
        if(name == "pipei_yp"){
          let ss = str.filter(v => {
            return !v.pp || v.pp != "#N/A"
          })
          that[name] = Object.assign([], ss)
          let PPHH = Storage.get("PPHH18")
          if(PPHH){
            PPHH = JSON.parse(PPHH)
            that.query.sort = PPHH.sort
            that.query.hanghao = PPHH.hanghao
            that.query.pihao = PPHH.pihao
            that.query.index = PPHH.index
          }else{
            that.handlStorage()
          }
        }else {
          that[name] = Object.assign([], str)
        }
      }
    },
    handlCopyZhl(row){
      let list = []
      list.push(row.xh, row.spfl, row.fxh, row.tymc, row.spbm);
      let str = list.join("\t")
      let save = function (e){
        e.clipboardData.setData('text/plain',str); 
        e.preventDefault();//阻止默认行为
      }
      document.addEventListener('copy',save);
      document.execCommand("copy");
      document.removeEventListener('copy',save);
      this.$message.success("已复制智慧脸数据，请粘贴使用！")
    },
    handlCopyYb(row){
      let str = 'A' + (Number(row.xh) + 2)
      let save = function (e){
        e.clipboardData.setData('text/plain',str); 
        e.preventDefault();//阻止默认行为
      }
      document.addEventListener('copy',save);
      document.execCommand("copy");
      document.removeEventListener('copy',save);
      
      this.$message.success("已复制医保文档序号，请粘贴使用！")
    },
    handlQuick(v){
      if(!this.pipei_yp.length){
        this.$message.error("请导入匹配药品的json文件！")
        return false
      }
      if(!this.quanbu_yp.length){
        this.$message.error("请导入默认全部商品的json文件！")
        return false
      }
      if(v == '+'){
        if(this.query.sort){
          if(this.query.index <= 0){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index--
        }else{
          if(this.query.index >= this.pipei_yp.length - 1){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index++
        }
      }else{
        if(this.query.sort){
          if(this.query.index >= this.pipei_yp.length - 1){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index++
        }else{
          if(this.query.index <= 0){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index--
        }
      }
      this.query.hanghao = Number(this.pipei_yp[this.query.index].xh) + 2
      this.query.pihao = this.pipei_yp[this.query.index].pp
      Storage.set("PPHH18", JSON.stringify({hanghao: this.query.hanghao, pihao: this.query.pihao, sort: this.query.sort, index: this.query.index}))
      this.handleSearch()
    },
    handlStorage(isSort){
      if(isSort){
        if(isSort == "sort"){
          if(this.query.sort){
            this.query.hanghao = Number(this.pipei_yp[this.pipei_yp.length - 1].xh) + 2
          }else{
            this.query.hanghao = Number(this.pipei_yp[0].xh) + 2
          }
        }
        let str = []
        str = this.pipei_yp.filter((v, i) => {
          if(Number(v.xh) + 2 == Number(this.query.hanghao)){
            this.query.index = i
          }
          return Number(v.xh) + 2 == Number(this.query.hanghao)
        })
        if(!str.length) {
          this.$message.error("未找到对应数据，请检查文件是否导入或行号输入错误!")
          return false
        }
        this.query.hanghao = Number(str[0].xh) + 2
        this.query.pihao = str[0].pp
      }else{
        if(this.query.sort){
          this.query.index = this.pipei_yp.length - 1
        }else{
          this.query.index = 0
        }
        this.query.hanghao = Number(this.pipei_yp[this.query.index].xh) + 2
        this.query.pihao = this.pipei_yp[this.query.index].pp
      }
      Storage.set("PPHH18", JSON.stringify({hanghao: this.query.hanghao, pihao: this.query.pihao, sort: this.query.sort, index: this.query.index}))
      this.handleSearch()
    },
    handleSearch(){
      if(!this.query.pihao || !this.query.type.length){
        this.$message.error("查询条件不得为空！")
        return false
      }
      if(!this.quanbu_yp.length){
        this.$message.error("请导入默认全部商品的json文件！")
        return false
      }
      this.loading = true
      let leftList = []
      let rightList = []
      for(let i = 0; i < 18; i++){
        let str = []
        str = this['yibao_yp' + (i+1)].filter(res => {
          return res.pzwh.includes(this.query.pihao)
        })
        rightList = [...rightList, ...str]
      }
      this.rightTableData = Object.assign([], rightList)
      let cList = []
      let quanbu_yp_str = []
      quanbu_yp_str = this.quanbu_yp.filter(res => {
        let ph = new String(res.pzwh)
        return ph.toUpperCase().includes(this.query.pihao)
      })
      leftList = [...leftList, ...quanbu_yp_str]
      leftList.forEach(v => {
        let str = []
        let spfl = "zhongchengyao_yp"
        if(v.spfl == '西药'){
          spfl = "baojianpin_yp"
        }
        str = this[spfl].filter(res => {
          let ph = new String(res.pzwh)
          return ph.toUpperCase().includes(this.query.pihao)
        })
        cList = [...cList, ...str]
      })
      leftList.forEach(v => {
        cList.forEach(vv => {
          if(v.spbm === vv.spbm){
            v.fxh = vv.xh
            return false
          }
        })
      })
      this.leftTableData = Object.assign([], leftList)
      this.leftHeight = 30 * this.leftTableData.length
      this.rightHeight = 30 * this.rightTableData.length
      this.loading = false
    },
    // handlType(){
    //   if(this.query.type.length > 2){
    //     this.$message.error("药品类别最多只能选2个！")
    //     this.query.type = ["quanbu_yp", "zhongchengyao_yp"]
    //     return false
    //   }
    //   if(!this.query.type.includes("quanbu_yp")){
    //     this.$message.error("药品类别必须包含全部商品！")
    //     this.query.type = ["quanbu_yp", "zhongchengyao_yp"]
    //     return false
    //   }
    //   if(this.query.type.length == 0){
    //     this.$message.error("全部商品不可删除！")
    //     this.query.type = ["quanbu_yp"]
    //     return false
    //   }
    // }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
      this.index = 0
    }
  }
}
</script>