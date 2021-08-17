<template>
  <div :class="cls">
    <slot></slot>
    <zui-loading v-if="loadingVisible"/>
  </div>
</template>
<script>
  import './less/page.less'
  import '../assets/css/vivify.min.css'
  import ZuiLoading from './Loading'
  import Util from '../Util'

  export default {
    props: {
      title: '诚维康大药房'
    },
    components: {
      ZuiLoading
    },
    computed: {
      cls () {
        const cls = (Util.os.android || Util.os.iPhone) ? '' : 'min-1200'
        return 'zui-page ' + cls
      },
      toastText () {
        return this.$store.state.toastText
      },
      loadingVisible () {
        return this.$store.state.loadingVisible
      }
    }
  }
</script>
