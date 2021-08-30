<template>
<div class="p-4" v-loading="loading" element-loading-text="正在加载医保数据，请稍等..."
    element-loading-spinner="el-icon-loading" @touchmove.prevent> 
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
            <div class="text-lg">中药饮片</div>
            <div><input type="file" @change="res => this.handleInfo(res.target, 'quanbu_yp')"></div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item :name="2">
        <template slot="title">
          <div class="text-xl">
            <i class="header-icon el-icon-search"></i>
            <span class="font-bold">默认查询条件<span class="text-sm">（PS：行号指的是医保中药饮片行号，医保中药饮片序号 = 行号 - 2）</span></span>
          </div>
        </template>
        <div class="flex flex-row my-2">
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">医保中药饮片行号排序</div>
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
            <div class="text-lg mr-2">中药饮片行号</div>
            <div class="drug-input-number">
              <!-- <el-input-number v-model="query.hanghao" placeholder="请输入行号" size="small" :min="3" @change="v => this.handlStorage('hanghao', v)" style="width:180px" /> -->
              <el-input @change="val => this.handlStorage('hanghao', val)" type="number" v-model="query.hanghao" placeholder="请输入中药饮片行号" size="small" :min="3" style="width:200px">
                <el-button @click="handlQuick('-')"  slot="prepend" icon="el-icon-minus"></el-button>
                <el-button @click="handlQuick('+')"  slot="append" icon="el-icon-plus"></el-button>
              </el-input>
            </div>
          </div>
          <div class="flex flex-row mx-2">
            <div class="text-lg mr-2">中药饮片名称</div>
            <div><el-input v-model="query.ypmc" placeholder="请输入中药饮片名称" size="small" clearable /></div>
          </div>
          <div class="ml-2"><el-button type="primary" size="small" @click="handleSearch">查询</el-button></div>
        </div>
      </el-collapse-item>
    </el-collapse>    
  </div>
  <div class="mt-5">
  <div class="text-xl font-bold">医保中药饮片列表</div>
    <el-table
      :data="rightTableData"
      border
      stripe
      :key="'right' + query.ypmc"
      @row-click="handlCopyYb"
      style="width: 100%">
      <template v-for="(item, index) in rightHeaders">
        <el-table-column v-bind="item" :key="'right' + index"></el-table-column>
      </template>
    </el-table>
  </div>
  <div class="mt-5">
    <div class="text-xl font-bold">包含中药饮片名字列表</div>
    <el-table
      class="zhl-table-style"
      :data="leftTableData"
      border
      @row-click="handlCopyZhl"
      :key="'left' + query.ypmc"
      style="width: 100%">
      <template v-for="(item, index) in leftHeaders">
        <el-table-column v-bind="item" :key="'left' + index"></el-table-column>
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
        ypmc: "",
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
          prop: "tymc",
          sortable: true
        },
        {
          label: "商品编号",
          align: "center",
          prop: "spbm",
          sortable: true
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
          label: "首次录入时间",
          align: "center",
          prop: "time",
          sortable: true
        },
        {
          label: "最近修改时间",
          align: "center",
          prop: "editTime",
          sortable: true
        },
        {
          label: "分类",
          align: "center",
          prop: "pp",
          sortable: true
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
        // {
        //   label: "基本单位条形码",
        //   align: "center",
        //   prop: "txm"
        // },
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
    let that = this
    this.$nextTick(() => {
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
    init(){
      this.yibao_zyyp = require("../../static/jsonZyyp/zyyp.json")
      let PPHH = Storage.get("ZYYP")
      if(PPHH){
        PPHH = JSON.parse(PPHH)
        this.query.sort = PPHH.sort
        this.query.hanghao = PPHH.hanghao
        this.query.ypmc = PPHH.ypmc
        this.query.index = PPHH.index
      }else{
        this.query.ypmc = this.yibao_zyyp[this.query.index].tymc
      }
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
        that[name] = Object.assign([], str)
        // that.handlStorage()
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
      this.$message.success("已复制商品数据，请粘贴使用！")
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
      
      this.$message.success("已复制医保中药饮片文档序号，请粘贴使用！")
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
          if(this.query.index >= this.yibao_zyyp.length - 1){
            this.$message.error("数据已经到底了，恭喜你！")
            return false
          }
          this.query.index++
        }
      }else{
        if(this.query.sort){
          if(this.query.index >= this.yibao_zyyp.length - 1){
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
      this.query.hanghao = Number(this.yibao_zyyp[this.query.index].xh) + 2
      this.query.ypmc = this.yibao_zyyp[this.query.index].tymc
      Storage.set("ZYYP", JSON.stringify({hanghao: this.query.hanghao, ypmc: this.query.ypmc, sort: this.query.sort, index: this.query.index}))
      this.handleSearch(v)
    },
    handlStorage(isSort){
      if(isSort){
        if(isSort == "sort"){
          if(this.query.sort){
            this.query.hanghao = Number(this.yibao_zyyp[this.yibao_zyyp.length - 1].xh) + 2
          }else{
            this.query.hanghao = Number(this.yibao_zyyp[0].xh) + 2
          }
        }
        let str = []
        str = this.yibao_zyyp.filter((v, i) => {
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
        this.query.ypmc = str[0].tymc
      }else{
        if(this.query.sort){
          this.query.index = this.yibao_zyyp.length - 1
        }else{
          this.query.index = 0
        }
        this.query.hanghao = Number(this.yibao_zyyp[this.query.index].xh) + 2
        this.query.ypmc = this.yibao_zyyp[this.query.index].tymc
      }
      Storage.set("ZYYP", JSON.stringify({hanghao: this.query.hanghao, ypmc: this.query.ypmc, sort: this.query.sort, index: this.query.index}))
      this.handleSearch()
    },
    handleSearch(v){
      if(!this.query.ypmc){
        this.$message.error("查询条件不得为空！")
        return false
      }
      if(!this.quanbu_yp.length){
        this.$message.error("请导入默认全部商品的json文件！")
        return false
      }
      this.loading = true
      let leftList = []
      leftList = this.quanbu_yp.filter(res => {
        return res.tymc.includes(this.query.ypmc)
      })
      if(!leftList.length){
        this.handlQuick(v)
        this.loading = false
        return false
      }
      this.leftTableData = Object.assign([], leftList)
      this.rightTableData = [this.yibao_zyyp[this.query.index]]
      this.leftHeight = 30 * this.leftTableData.length
      this.rightHeight = 30 * this.rightTableData.length
      this.loading = false
    }
  }
}
</script>