<template>
  <div class="container" id="vditor">

  </div>
</template>

<script setup lang="ts">
// https://www.cnblogs.com/fzu221801127/p/14939429.html?ivk_sa=1024320u
import Vditor from 'vditor'
import 'vditor/src/assets/scss/index.scss'
import { ref, reactive, toRefs, onMounted, defineExpose } from 'vue'
let vditor = null
onMounted(() => {
  vditor = new Vditor('vditor', {
    height: 360,
    toolbarConfig: {
      pin: true,
    },
    cache: {
      enable: false,
    },
    after: () => {
      vditor.setValue('hello, Vditor + Vue!')
    },
  })
})
const getContent = () => {
  return vditor.getValue()
}
defineExpose({
  getContent
})

</script>

<style lang="less" scoped>
</style>