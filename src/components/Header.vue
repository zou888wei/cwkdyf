<template>
  <header class="zui-header">
    <slot></slot>
  </header>
</template>
<script>
  import './less/header.less'
  import Logo from './Logo'
  export default {
    components: {Logo}
  }
</script>
