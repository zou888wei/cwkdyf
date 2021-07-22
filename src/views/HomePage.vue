<template>
  <page class="home-page">
    <zui-header>
      <logo type="xiaoyanyun" href="/"></logo>
        <h4 class="zui-logo-text">
          <el-divider direction="vertical"></el-divider>诚维康大药房
        </h4>
         <div class="zui-rightcol" @click="openMenu" style="color: #0b8ba5;">◄目录►</div>
         <drop-list :config="configData" ref="droplist"></drop-list>
         <zui-button @click="onButtonClick('link')">联系我们</zui-button>
         <zui-button @click="onButtonClick('news')">新闻动态</zui-button>
         <zui-button @click="onButtonClick('culture')">企业文化</zui-button>
         <zui-button @click="onButtonClick('product')">产品中心</zui-button>
         <zui-button @click="onButtonClick('about')">关于我们</zui-button>
         <zui-button @click="onButtonClick('home')">首页</zui-button>
    </zui-header>
    <div class="banner vivify fadeIn"></div>
    <components :is="containerBox" />
    <zui-footer/>
  </page>
</template>
<script>
  import './less/home-page.less'
  import Logo from '../components/Logo'
  import Page from '../components/Page'
  import ZuiHeader from '../components/Header'
  import ZuiFooter from '../components/Footer'
  import ZuiButton from '../components/Button'
  import feature1 from '../assets/img/feature1.png'
  import feature2 from '../assets/img/feature2.png'
  import feature3 from '../assets/img/feature3.png'
  import feature4 from '../assets/img/feature4.png'
  import Util from '../Util'
  import DropList from 'vue-droplist'
  import Home from './home'
  import About from './about'
  import Product from './product'
  import Culture from './culture'
  import News from './news'
  import Link from './link'
  export default{
    components: {Page, Logo, ZuiHeader, ZuiFooter,ZuiButton,DropList, Home, About,Product,Culture,News,Link},
    data () {
      return {
        feature1: feature1,
        feature2: feature2,
        feature3: feature3,
        feature4: feature4,
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
        containerBox: "Home"
      }
    },
   methods: {
      onButtonClick: function (e) {
        this.containerBox = e.charAt(0).toUpperCase() + e.slice(1)
      },
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
