<template>
  <div class="content-detail">
    <div class="content-section h100">
      <TextView v-if="type === 'text'" :data="currentText" />
      <LinkView v-if="type === 'link'" :iframeSrc="iframeSrc" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, reactive, toRefs} from "vue"
import { useRouter } from 'vue-router'
const router = useRouter()
import TextView from './components/TextView.vue'
import LinkView from './components/LinkView.vue'

const type = router.currentRoute.value.query.type
</script>

<style lang="less" scoped>
</style>
