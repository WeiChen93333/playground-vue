<template>
  <div class="container">
    workbench

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
 interface dataProps{

 }
export default defineComponent({
  name:"App",
  setup() {
  },
  methods: {
    toSurf () {
      this.$router.push('/playground-vue/surfing')
    }
  }
})
</script>

<style lang="less" scoped>
</style>
