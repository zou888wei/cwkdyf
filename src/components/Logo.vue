<template>
  <div class="zui-box">
    <img alt="诚维康大药房" class="zui-logo" :src="src"/>
  </div>
</template>
<script>
  import './less/logo.less'
  import logo from './img/logo.png'
  export default {
    name: 'Logo',
    props: {
      href: {
        default: '/'
      }
    },
    computed: {
      src: function () {
        return logo
      }
    }
  }
</script>
