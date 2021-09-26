<template>
  <div class="iframe-container">
    <iframe
      :src="props.iframeSrc"
      height="100%"
      width="100%"
      name="music"
      frameborder="0"
      scrolling="auto"
      sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts"
    ></iframe>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  iframeSrc: {
    type: String,
    required: true
  }
})
</script>
<style lang="less" scoped>
.iframe-container{
    height: calc(100% - 60px)
  }
</style>
