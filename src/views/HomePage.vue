<template>
  <page class="home-page">
    <zui-header>
      <logo type="xiaoyanyun" href="/home"></logo>
        <h4 class="zui-logo-text">
          <el-divider direction="vertical"></el-divider>诚维康大药房
        </h4>
         <div class="zui-rightcol" @click="openMenu" style="color: #0b8ba5;">◄目录►</div>
         <drop-list :config="configData" ref="droplist"></drop-list>
         <div class="float-right flex" style="margin: 30px 30px 0 0;">
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[$router.currentRoute.name == 'Home'?'el-button--primary':'el-button--text']" @click="onButtonClick('home')">首页</el-button>
           </div>
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[$router.currentRoute.name == 'About'?'el-button--primary':'el-button--text']" @click="onButtonClick('about')">关于我们</el-button>
           </div>
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[($router.currentRoute.name == 'Product' || $router.currentRoute.name == 'ProductDetail')?'el-button--primary':'el-button--text']" @click="onButtonClick('product')">产品中心</el-button>
           </div>
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[$router.currentRoute.name == 'Culture'?'el-button--primary':'el-button--text']" @click="onButtonClick('culture')">企业文化</el-button>
           </div>
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[$router.currentRoute.name == 'News'?'el-button--primary':'el-button--text']" @click="onButtonClick('news')">新闻资讯</el-button>
           </div>
           <div class="mx-3">
            <el-button style="padding: 12px 20px;" :class="[$router.currentRoute.name == 'Link'?'el-button--primary':'el-button--text']" @click="onButtonClick('link')">联系我们</el-button>
           </div>
         </div>
    </zui-header>
    <div class="banner vivify fadeIn"></div>
    <div class="w-8/12 m-auto mt-10" v-if="$router.currentRoute.name != 'Home' && $router.currentRoute.path != '/'">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>当前位置：<a @click="onButtonClick('home')">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item>
          <span v-if="$router.currentRoute.name != 'ProductDetail'">{{menus[$router.currentRoute.name.toLowerCase()]}}</span>
          <a v-else @click="onButtonClick('product')">{{menus[$router.currentRoute.name.toLowerCase()]}}</a>
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="$router.currentRoute.name == 'ProductDetail'">{{$router.currentRoute.params.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <router-view />
    <zui-footer/>
  </page>
</template>
<script>
  import './less/home-page.less'
  import Logo from '../components/Logo'
  import Page from '../components/Page'
  import ZuiHeader from '../components/Header'
  import ZuiFooter from '../components/Footer'
  import Util from '../Util'
  import DropList from 'vue-droplist'

  import { routerLink } from "@/mixins"
  
  export default{
    mixins: [routerLink],
    components: {Page, Logo, ZuiHeader, ZuiFooter, DropList},
    data () {
      return {
        carouselPerPage: (Util.os.android || Util.os.iPhone) ? 1 : 2,
        configData : {
            position: {  // 设置显示位置，position
              top: '60px',
              right: '15px',
              bottom: '',
              left: ''
            },
            width: '40%', // 设置宽度
            list: [ // 设置下拉列表数据和对应的点击事件
              {text: '首页', action: this.gohome},
              {text: '关于我们', action: this.goabout},
              {text: '产品中心', action: this.goproduct},
              {text: '企业文化', action: this.goculture},
              {text: '新闻动态', action: this.gonews},
              {text: '联系我们', action: this.golink}
            ]
        },
        menus: {
          home: "首页",
          about: "关于我们",
          product: "产品中心",
          productdetail: "产品中心",
          culture: "企业文化",
          news: "新闻动态",
          link: "联系我们",
        }
      }
    },
    methods: {
      openMenu: function () {
       this.$refs.droplist.show()
      },
      gohome: function () {
       this.onButtonClick("home")
      },
      goabout: function () {
       this.onButtonClick("about")
      },
      goproduct: function () {
        this.onButtonClick("product")
      },
      goculture: function () {
        this.onButtonClick("culture")
      },
      gonews: function () {
        this.onButtonClick("news")
      },
      golink: function () {
        this.onButtonClick("link")
      }
    }

  }
</script>
