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
          <!-- <div class="w-1/4">
            <div class="text-lg">匹配的药品</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'pipei_yp')"></div>
          </div> -->
          <div class="w-1/4">
            <div class="text-lg">中药饮片</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'quanbu_yp')"></div>
          </div>
          <!-- <div class="w-1/4">
            <div class="text-lg">西药</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'baojianpin_yp')"></div>
          </div>
          <div class="w-1/4">
            <div class="text-lg">中成药</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'zhongchengyao_yp')"></div>
          </div> -->
        </div>
      </el-collapse-item>
      <el-collapse-item :name="2">
        <template slot="title">
          <div class="text-xl">
            <i class="header-icon el-icon-search"></i>
            <span class="font-bold">默认查询条件<span class="text-sm">（PS：行号指的是Excel行号，全部商品序号 = 行号 - 2）</span></span>
          </div>
        </template>
        <div class="flex flex-row my-2">
          <!-- <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">药品类别</div>
            <el-select class="w-96" v-model="query.type" multiple placeholder="请选择商品类别" size="small" disabled>
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div> -->
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
            <div class="text-lg mr-2">匹配商品行号</div>
            <div class="drug-input-number">
              <!-- <el-input-number v-model="query.hanghao" placeholder="请输入行号" size="small" :min="3" @change="v => this.handlStorage('hanghao', v)" style="width:180px" /> -->
              <el-input @change="val => this.handlStorage('hanghao', val)" type="number" v-model="query.hanghao" placeholder="请输入行号" size="small" :min="3" style="width:200px">
                <el-button @click="handlQuick('-')"  slot="prepend" icon="el-icon-minus"></el-button>
                <el-button @click="handlQuick('+')"  slot="append" icon="el-icon-plus"></el-button>
              </el-input>
            </div>
          </div>
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">商品名称</div>
            <div><el-input v-model="query.pihao" placeholder="请输入商品名称" size="small" clearable /></div>
          </div>
          <div class="ml-2"><el-button type="primary" size="small" @click="handleSearch">查询</el-button></div>
        </div>
      </el-collapse-item>
    </el-collapse>    
  </div>
  <div v-if="leftTableData.length" class="mt-5">
    <div class="text-xl font-bold">包含中药饮片名字列表</div>
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
    <div class="text-xl font-bold">医保中药饮片列表</div>
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
export default {
  data(){
    return {
      loading: false,
      active: [1,2],
      query: {
        pihao: "",
        index: 0,
        hanghao: 3,
        sort: 0
      },
      sortList: [{
        label: "正序",
        value: 0
      },{
        label: "倒序",
        value: 1
      }],
      yibao_zyyp: [],
      quanbu_yp: [],
      leftTableData: [],
      rightTableData: [],
      leftHeaders: [
        {
          label: "总序号",
          align: "center",
          prop: "xh"
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
          label: "商品名称",
          align: "center",
          prop: "spmc"
        },
        {
          label: "产地",
          align: "center",
          prop: "cd"
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
          label: "医保文档中药饮片行号",
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
          label: "中药饮片名称",
          align: "center",
          prop: "tymc"
        },
        {
          label: "药材名称",
          align: "center",
          prop: "spmc"
        }
      ],
      leftHeight: 0,
      rightHeight: 0,
      timer: "",
      index: 0,
      copys:""
    }
  },
  created(){
    this.init()
  },
  methods: {
    init(){
      this.yibao_zyyp = require("../../static/jsonZyyp/zyyp.json")
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
        let PPHH = Storage.get("ZYYP")
        if(PPHH){
          PPHH = JSON.parse(PPHH)
          that.query.sort = PPHH.sort
          that.query.hanghao = PPHH.hanghao
          that.query.pihao = PPHH.pihao
          that.query.index = PPHH.index
        }else{
          that.handlStorage()
        }
        that[name] = Object.assign([], str)
      }
    },
    handlCopyZhl(row){
      let list = []
      list.push(row.xh, row.tymc, row.spbm);
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
          if(this.query.index >= this.quanbu_yp.length - 1){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index++
        }
      }else{
        if(this.query.sort){
          if(this.query.index >= this.quanbu_yp.length - 1){
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
      this.query.hanghao = Number(this.quanbu_yp[this.query.index].xh) + 2
      this.query.pihao = this.quanbu_yp[this.query.index].tymc
      Storage.set("PPHH", JSON.stringify({hanghao: this.query.hanghao, pihao: this.query.pihao, sort: this.query.sort, index: this.query.index}))
      this.handleSearch()
    },
    handlStorage(isSort){
      if(isSort){
        if(isSort == "sort"){
          if(this.query.sort){
            this.query.hanghao = Number(this.quanbu_yp[this.quanbu_yp.length - 1].xh) + 2
          }else{
            this.query.hanghao = Number(this.quanbu_yp[0].xh) + 2
          }
        }
        let str = []
        str = this.quanbu_yp.filter((v, i) => {
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
      Storage.set("PPHH", JSON.stringify({hanghao: this.query.hanghao, pihao: this.query.pihao, sort: this.query.sort, index: this.query.index}))
      this.handleSearch()
    },
    handleSearch(){
      if(!this.query.pihao){
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
      rightList = this.yibao_zyyp.filter(res => {
        return this.query.pihao.includes(res.pzwh)
      })
      this.rightTableData = Object.assign([], rightList)
      let cList = []
      let quanbu_yp_str = []
      quanbu_yp_str = this.quanbu_yp.filter(res => {
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